import './home.css';
import renderHTML from '../components/renderHTML.js';
import usernameMatches from './usernameMatches.js';
import router from '../components/router.js';

const home = () => {
  const html = `
      <div>gitits.to</div> 
      </div>
        @<input id="input" type="text" autocomplete="off" />
      </div>
    `;
  renderHTML(html, document.querySelector('#root'));
  document.querySelector('#input').addEventListener('keydown', e => {
    const key = e.keyCode;
    if (key === 13) {
      let value = e.target.value;
      const isMatches = usernameMatches(value);
      if (isMatches) {
        e.target.value = '';
      } else {
        router(`/${value}`);
      }
    }
  });
};

export default home;
