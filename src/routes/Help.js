import $ from '../modules/selector.js';
import renderHTML from '../modules/renderHTML.js';

const Help = () => {
  const html = `help`;
  renderHTML(html, $('#root'));
};

export default Help;
