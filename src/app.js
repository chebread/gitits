import './reset.css';
import './app.css';
import router from './components/router.js';

const app = () => {
  const render = () => {
    router(window.location.pathname);
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
  render();
};
app();
