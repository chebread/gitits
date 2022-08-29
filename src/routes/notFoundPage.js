import './NotFoundPage.css';
import renderHTML from '../modules/renderHTML.js';

const NotFoundPage = () => {
  const contentMsg = `
      <div style="display: block;">
        <div style="padding: 5px;">
          <div style="max-width: 850px; font-size: 16px; word-wrap: break-word;" role="content">
            <p style="line-height: 16px;">404 Not found page.<br/>
            Sorry. Do you want <a href="/" style="all: unset; cursor: text; color: royalblue;">to go the first route</a>?</p>
          </div>
      </div>
    `;
  renderHTML(contentMsg, document.querySelector('#root'));
  document
    .querySelector('a')
    .addEventListener(
      'ontouchstart' in document.documentElement ? 'touchstart' : 'mouseover',
      e =>
        (e.target.style =
          'all: unset; cursor: text; color: royalblue; text-decoration: underline;')
    );
  document
    .querySelector('a')
    .addEventListener(
      'ontouchstart' in document.documentElement ? 'touchend' : 'mouseleave',
      e => (e.target.style = 'all: unset; cursor: text; color: royalblue;')
    );
};

export default NotFoundPage;
