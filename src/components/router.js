import render from './render.js';

const router = path => {
  if (!(path === window.location.pathname)) {
    const url = window.location.origin + path;
    window.history.pushState(null, null, url);
  }
  // 404처리는 routes의 동적처리로 해주고 있음
  render(path);
  window.onpopstate = () => {
    render(window.location.pathname);
  };
};

export default router;
