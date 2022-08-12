// import helmet from './helmet.js';
import changePath from './changePath.js';
import renderRoute from './renderRoute.js';

const router = path => {
  // router 함수는 그냥 path만 바꾸는 함수!
  changePath(path);
  // 404처리는 routes의 동적처리로 해주고 있음
  renderRoute(path); // 특정 컴포넌트를 실행합니다
  //helmet(path);
};

export default router;
