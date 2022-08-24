import './home.css';
import renderHTML from '../components/renderHTML.js';
import usernameMatches from './usernameMatches.js';
import router from '../components/router.js';
import logoSvg from '../assets/logoSvg.js';

const home = () => {
  // html comments is code highlighting for the VSCode extensions
  const html = /* html */ `
    <div class="app">
      <!--container-->
      <div class="h-94 p-10 max-width flex direction-column">
        <!--logo-->
        <div class="h-45 flex items-center" >
          <a href="/">
            <div class="f-32 gitits-logo"> <!--temperary-->
              <span>gitits.to</span>
            </div>
          </a>
        </div>
        <div class="h-4"></div>
        <!--input style="background-color: red"-->
        <div class="
          f-28 h-45 w-320 p-10
          flex direction-row items-center
          border-1 border-whitesmoke radius-500 border bg-whitesmoke border search">
          <span>@</span>
          <input
            id="searchUser"
            style="width: 100%"
            type="text"
            autocomplete="off"
            />
        </div>
      </div>
    </div>
  `;
  renderHTML(html, document.querySelector('#root'));
  document.querySelector('#searchUser').addEventListener('keydown', e => {
    const key = e.keyCode;
    if (key === 13) {
      const value = e.target.value;
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

// <!--search-->
// <div class="blanks"></div>
