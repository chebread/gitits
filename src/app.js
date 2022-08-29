import './reset.css';
import './app.css';
import './default.css';
import render from './modules/render.js';
// const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const app = () => {
  render(); // 최상단 컴포넌트에서 한번만 실행가능 한 함수입니다.
};
app(); // app 컴포넌트는 자기 자신을 실행하는 함수입니다. (index.js와 같은 역할)

/*
style tag를 쓰게된다면 한 컴폰너트의 한개만 사용할 수 있게 된다
styled 를 만들어 여기에 literel을 전달하여 style="..."를 반환하는 것을 만들자 (어짜피 문자열은 재사용 가능)
const app = styled(`
  display: flex;
  ...
`)
그리고 define.css도 활용하자. 그저 focus 같은 것을 handlling 하기 위한 것임.
*/
