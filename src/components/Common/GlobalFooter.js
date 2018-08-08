import React from 'react';
import styles from './GlobalFooter.less';

// const footerMenu = [
//   {
//     label: '新手指引',
//     children: [
//       {label: '新手须知', url: ''},
//       {label: '风控管理', url: ''},
//       {label: '收费准则', url: ''},
//       {label: '帮助中心', url: ''}
//     ]
//   },
//   {
//     label: '新闻资讯',
//     children: [
//       {label: '网站公告', url: ''},
//       {label: '公司新闻', url: ''},
//       {label: '行业资讯', url: ''},
//       {label: '媒体报道', url: ''}
//     ]
//   },
//   {
//     label: '关于我们',
//     children: [
//       {label: '公司介绍', url: ''},
//       {label: '合作机构', url: ''},
//       {label: '联系我们', url: ''},
//       {label: '网站地图', url: ''}
//     ]
//   },
// ];
//
// const linkMenu = [
//   {label: '公司介绍', url: ''},
//   {label: '合作机构', url: ''},
//   {label: '联系我们', url: ''},
//   {label: '网站地图', url: ''}
// ];

const GlobalFooter = (props) => {
  return(
    <div className={styles.container}>
      <div className={styles.footContent}>
        <div className={styles.top}>
          footerTop
        </div>
        <div className={styles.bottom}>
          footerBottom
        </div>
      </div>
    </div>
  )
};

export default GlobalFooter
