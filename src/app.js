import './reset.css';
import './app.css';
import './default.css';
import render from './modules/render.js';
// const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const app = () => {
  render(); // 최상단 컴포넌트에서 한번만 실행가능 한 함수입니다.
};
app(); // app 컴포넌트는 자기 자신을 실행하는 함수입니다. (index.js와 같은 역할)
