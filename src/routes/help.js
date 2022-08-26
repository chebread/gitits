import renderHTML from '../components/renderHTML.js';

const help = () => {
  const html = `
    <h1>Help</h1>
  `;
  renderHTML(html, document.querySelector('#root'));
};

export default help;
