import routes from './routes.js';

const render = path => {
  if (!routes(path).title) {
    document.title = 'gitits';
  } else {
    document.title = routes(path).title + (path === '/' ? '' : ' - gitits');
    // home route가 아니면 모두 - memere 를 title에 붙입니다.
  }
  // if (!(path.indexOf('@') === -1))
  routes(path).route(); // 동적 라우트 URL parameter
  // else routes(path).route();
};

export default render;
