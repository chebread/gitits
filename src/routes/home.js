import './home.css';
import renderHTML from '../components/renderHTML.js';
import usernameMatches from '../components/usernameMatches.js';
import router from '../components/router.js';
import search from '../components/search.js';

const home = () => {
  // html comments is code highlighting for the VSCode extensions
  const html = /* html */ `
    <div class="app">
      <!--container-->
      <div class="max-w-1024">
        <!--header-->
        ${search()}
        <!--bottom-->
        <div>
      <!--items-->
      <div class="f-18 flex direction-row flex-wrap">
        <!--item-->
        <div class="p-l-10">
          <div class="
            hovered-item
            p-10 h-30
            flex items-center
            border-1 border-whitesmoke dm-border-whitesmoke radius-500 border bg-whitesmoke dm-bg-whitesmoke">
            <span>
              <a href="/help">How to use</a>
            </span>
          </div>
        </div>
      </div>
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
