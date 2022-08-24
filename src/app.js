import './reset.css';
import './app.css';
import './define.css';
import render from './components/render.js';

const app = () => {
  render(); // 최상단 컴포넌트에서 한번만 실행가능 한 함수입니다.
};
app(); // app 컴포넌트는 자기 자신을 실행하는 함수입니다. (index.js와 같은 역할)
