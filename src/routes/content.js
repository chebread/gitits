import renderHTML from '../components/renderHTML.js';
import request from '../components/request.js';
import useState from '../components/useState.js';
import innerContent from './innerContent.js';
// import isSelected from '../components/isSelected.js';
// path parameter type => users/years/ (or users/)

const content = () => {
  const path = window.location.pathname.substring(
    1,
    window.location.pathname.length
  ); // 항상 url parameter는 컴포넌트내에서 관리 해야한다

  const [commits, setCommits] = useState(path);
  const [v, setV] = useState(0);
  window.increse = () => {
    setCommits(commits + path);
    setV(v + 1);
  };
  const html = `
    <div><a href="/">Back to the home</a></div>
    <div id="commits">${commits}</div>
    <div id="years">${v}</div>
    <button onclick="increse()"id="btn">Btn</button>
    <div id="inner">
     <!-내부 useState 실험 구역-->
    </div>
  `;
  renderHTML(html, document.querySelector('#root'));
  innerContent();
};

export default content;
