import renderHTML from '../components/renderHTML.js';
import router from '../components/router.js';
import matches from '../components/matches.js';
import './home.css';

const home = () => {
  const render = () => {
    const html = `
      <div>gitits.com</div>
      <div>@<input id="id" type="text" /></div>
    `;
    renderHTML(html, document.querySelector('#root'));
    document.querySelector('#id').addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        const isMatches = matches(e.target.value);
        // console.log(isMatches);
        if (isMatches) {
          // isMaches is true
          e.target.value = '';
        } else {
          // isMaches is false
          // /가 감지 되면 안되게!
          // user/year에서 user만 넘겨짐
          router(
            `/${e.target.value.substring(
              0,
              e.target.value.indexOf('/') === -1
                ? e.target.value.length
                : e.target.value.indexOf('/')
            )}`
          );
        }
      }
    });
  };
  render();
};

export default home;
