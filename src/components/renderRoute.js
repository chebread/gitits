import routes from './routes.js';

const renderRoute = path => {
  // title이 존재 하지 않을 수는 없어서 그냥 이렇게 처리
  // home route가 아니면 모두 - memere 를 title에 붙입니다.
  // if (!(path.indexOf('@') === -1))
  routes(path).route(); // 동적 라우트 URL parameter
  // else routes(path).route();
};

export default renderRoute;
