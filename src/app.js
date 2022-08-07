import './reset.css';
import './app.css';
import router from './components/router.js';
import { render } from './components/util.js';

const app = () => {
  // console.log('render');
  render(window.location.pathname);
  // render는 항상 url을 인자로 받아야만 한다! (클로저 때문에!)
};
app(); // app 컴포넌트는 자기 자신을 실행하는 함수입니다. (index.js와 같은 역할)
