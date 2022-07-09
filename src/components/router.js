import helmet from './helmet.js';
import renderRoute from './renderRoute.js';

const router = path => {
  if (!(path === window.location.pathname)) {
    const url = window.location.origin + path;
    window.history.pushState(null, null, url);
  }
  // 404처리는 routes의 동적처리로 해주고 있음
  renderRoute(path);
  helmet(path);
  window.onpopstate = () => {
    renderRoute(window.location.pathname);
    helmet(path);
  };
};

export default router;
