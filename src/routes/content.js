import renderHTML from '../components/renderHTML.js';
import request from '../components/request.js';
import isSelected from '../components/isSelected.js';
import useState from '../components/useState.js';

const content = path => {
  // path parameter type => users/years/ (or users/)
  const pathArray = path.split('/');
  const username = pathArray[0];
  const parameterYear = pathArray[1];
  const thisYear = new Date().getFullYear();
  // static html content rendering
  const html = `
      <div><a href="/">Back to the home</a></div>
      <div id="commits"></div>
      <div id="years"></div>
    `;
  renderHTML(html, document.querySelector('#root'));
  // dynamic logic
  const render = () => {
    let totalContributions = 0;
    const content = `${username} is ${totalContributions} commits`;
    renderHTML(content, document.querySelector('#commits'));
  };
  render();
};

export default content;
