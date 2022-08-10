import renderHTML from '../components/renderHTML.js';
import request from '../components/request.js';
import useState from '../components/useState.js';
// import isSelected from '../components/isSelected.js';
// path parameter type => users/years/ (or users/)

const content = path => {
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
  `;
  renderHTML(html, document.querySelector('#root'));
};

export default content;
