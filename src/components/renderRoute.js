import routes from './routes.js';

const renderRoute = path => {
  // title이 존재 하지 않을 수는 없어서 그냥 이렇게 처리
  // home route가 아니면 모두 - memere 를 title에 붙입니다.
  // if (!(path.indexOf('@') === -1))
  routes(path).route(); // 특정 컴포넌트를 실행합니다
  // else routes(path).route();
};

export default renderRoute;
