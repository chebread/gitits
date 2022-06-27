import './home.css';
import renderHTML from '../components/renderHTML.js';
import router from '../components/router.js';
import matches from '../components/matches.js';

const home = () => {
  const render = () => {
    // home만 gitits.com 로고 표시하기
    const html = `
      <div>gitits.com</div> 
      <div>@<input type="text" id="username-input" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" /></div>
    `;
    renderHTML(html, document.querySelector('#root'));
    document.querySelector('#username-input').addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        const isMatches = matches(e.target.value);
        // console.log(isMatches);
        console.log(isMatches);
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
