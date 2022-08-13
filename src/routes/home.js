import './home.css';
import renderHTML from '../components/renderHTML.js';
import router from '../components/router.js';

const home = () => {
  const usernameMatches = str => {
    // user/yyyy가 아닌 user만 받기 위해서 따로 함수 선언
    const regexpStr = /(^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})/gi;
    const matched = str.match(regexpStr);
    if (matched === null) return true;
    else {
      if (matched.join() === str) {
        return false;
      } else return true;
    }
  };
  const html = `
      <div>gitits.to</div> 
      </div>
        @<input id="username-input" autocomplete="off" type="text" />
      </div>
    `;
  renderHTML(html, document.querySelector('#root'));
  document.querySelector('#username-input').addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      let value = e.target.value;
      const isMatches = usernameMatches(value);
      if (isMatches) {
        e.target.value = '';
      } else {
        // router의 문제 해결하기
        router(
          `/${value.substring(
            0,
            value.indexOf('/') === -1 ? value.length : value.indexOf('/')
          )}`
        );
      }
    }
  });
};

export default home;
