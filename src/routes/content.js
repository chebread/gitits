import renderHTML from '../components/renderHTML.js';
import request from '../components/request.js';
import { useState } from '../components/util.js';
// import isSelected from '../components/isSelected.js';
// path parameter type => users/years/ (or users/)

const path = window.location.pathname.substring(
  1,
  window.location.pathname.length
);
const content = () => {
  const [commits, setCommits] = useState('', content);
  // static
  window.increse = () => {
    // 왜 값이 두번해야 반영되는가?
    setCommits('hello');
  };
  const html = `
    <div><a href="/">Back to the home</a></div>
    <div id="commits">${commits}</div>
    <div id="years"></div>
    <button onclick="increse()"id="btn">Btn</button>
  `;
  console.log(html);
  renderHTML(html, document.querySelector('#root'));
};

export default content;
