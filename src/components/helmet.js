// this helment function is like React helemet library
import routes from '../components/routes.js';
import appendHTML from '../components/appendHTML.js';

const updateTitle = title => {
  document.title = title;
};

const updateMetaTag = (content, targetElement) => {
  targetElement.setAttirbutes('content', content);
};

const helmet = path => {
  // // document.title = routes(path).title + (path === '/' ? '' : ' - gitits.com');
  // const username = routes(path).title;
  // const title = username + (path === '/' ? '' : ' - gitits.com');
  // // const description = `This is ${username}'s gitits`;
  // // const url =
  // //   window.location.protocol +
  // //   '//' +
  // //   window.location.host +
  // //   window.location.pathname;
  // // 1. 일단은 renderHTML로 og 태그를 지정한다.
  // // 2. 그다음 속성을 변경한다 (속성만)
  // const staticContent = `
  //   <meta property="og:type" content="website">
  //   <meta property="og:url" > <!--변동-->
  //   <meta property="og:title" > <!--변동-->
  //   <meta property="og:image" content="Blank">
  //   <meta property="og:description" > <!--변동-->
  //   <meta property="og:site_name" content="gitits.com">
  //   <meta property="og:locale" content="ko_KR">
  //   <meta property="og:image:width" content="300">
  //   <meta property="og:image:height" content="300">
  //   <meta property="og:locale:alternate" content="en_US">
  // `;
  // var insertedContent = document.querySelector('meta[property="og:title"');
  // if (insertedContent) {
  //   console.log(1);
  //   insertedContent.parentNode.removeChild(insertedContent);
  // }
  // appendHTML(staticContent, document.querySelector('head'));
};

export default helmet;
