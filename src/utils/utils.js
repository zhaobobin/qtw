import moment from 'moment';
import { parse, stringify } from 'qs';

export const ENV = {
  version: '0.0.1',

  appname: '去投网',
  hometitle: '【去投网】P2P理财- 中国领先的互联网理财借贷P2P平台',
  keywords: '去投网，p2p网贷平台，p2c投融资平台,网上理财,p2p理财,普惠金融, 智慧金融,投资者平台,个人投资理财,互联网理财,理财融资,投资理财网,网络投资,企业贷款,足值抵押,p2b平台,p2p网贷平台,互联网金融,科技金融,放心投资,放心理财,短期理财产品,互联网金融服务，云计算。',
  description: '去投网（www.qutouwang.com）- 中国领先互联网金融P2P理财网贷平台，通过云计算、监管系统、人工智能、大数据、安全系统等各种手段谋求风控安全最大化。为投资理财用户和贷款用户提供公平、透明、安全、高效的网上理财、小额贷款、短期贷款、个人贷款、无抵押贷款等互联网金融服务。（1分钟快速注册，100元即可轻松加入去投网）。',
  author: '去投网(www.qutouwang.com)',
  verification: 'dXQb0UUYe3',

  address: '北京市朝阳区亮马桥路甲40号二十一世纪大厦B座3层',
  hotline: '400-181-0588',
  icp: 'ICP经营许可证 京B2-20160180',
  beian: '京ICP备14014223号-2',
  copyright: '©2015-2018 去投网 All rights reserved',
  slogan: '摄影图片分享社区',
  web: 'www.qutouwang.com',
};

/**
 * Storage
 * @type {{set: Storage.set, get: Storage.get, remove: Storage.remove}}
 */
export const Storage = {
  set: function(key, data) {	// 保存
    return window.localStorage.setItem(key, window.JSON.stringify(data));
  },
  get: function(key) {			// 查询
    return window.JSON.parse(window.localStorage.getItem(key));
  },
  remove: function(key) {	// 删除
    return window.localStorage.removeItem(key);
  },
};

/**
 * uuid
 * @returns {string}
 */
function uuid() {
  let len = 32; // 32长度
  let radix = 16; // 16进制
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [],i;radix=radix||chars.length;
  if(len){
    for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];
  }else{
    let r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';
    for(i=0;i<36;i++){
      if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i===19)?(r&0x3)|0x8:r];
      }
    }
  }
  return uuid.join('');
}

/**
 * 全局参数
 * @param url
 * @param options
 * @returns {{url: string, payload: {uid: string, sign: string, request_id: string, req_from: string, req_ver: string}}}
 */
export function globalOptions(url, options){

  let apiUrl = '/cms/api/v1' + url,
    uid = options.uid ? options.uid : '',
    sign = options.token ? window.md5(options.token + '_' + url) : '';
  return {
    url: apiUrl,
    payload: {
      ...options,
      uid: uid,
      sign: sign,
      request_id: uuid(),
      req_from:'web',
      req_ver:'1.0.0',
    },
  };
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  m += s1.split('.').length > 1 ? s1.split('.')[1].length : 0;
  m += s2.split('.').length > 1 ? s2.split('.')[1].length : 0;
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / 10 ** m;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟', '万']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(accMul(num, 10 * 10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}
