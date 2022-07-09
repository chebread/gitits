import './home.css';
import renderHTML from '../components/renderHTML.js';
import router from '../components/router.js';
import matches from '../components/matches.js';

const home = () => {
  const render = () => {
    // home만 gitits.com 로고 표시하기
    const html = `
      <div>gitits.com</div> 
      </div>
        @<input id="username-input" autocomplete="off" type="text" />
      </div>
    `;
    renderHTML(html, document.querySelector('#root'));
    document.querySelector('#username-input').addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        const isMatches = matches(e.target.value);
        if (isMatches) {
          e.target.value = '';
        } else {
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
