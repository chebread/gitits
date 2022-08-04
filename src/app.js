import './reset.css';
import './app.css';
import router from './components/router.js';

const app = () => {
  // console.log('render');
  router(window.location.pathname);
  // render는 항상 url을 인자로 받아야만 한다! (클로저 때문에!)
  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
      if (e.target.nodeName === 'A') {
        const url = e.target.attributes.href.nodeValue;
        if (url.search(/https?:\/\//) === -1) {
          e.preventDefault();
          router(url);
        }
      }
    });
  });
};
app(); // app 컴포넌트는 자기 자신을 실행하는 함수입니다. (index.js와 같은 역할)
