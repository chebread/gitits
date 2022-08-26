import './home.css';
import renderHTML from '../components/renderHTML.js';
import usernameMatches from '../components/usernameMatches.js';
import router from '../components/router.js';

const home = () => {
  // html comments is code highlighting for the VSCode extensions
  const html = /* html */ `
    <div class="app">
      <!--container-->
      <div class="max-width">
        <!--header-->
        <div class="h-94 p-10 flex direction-column">
          <!--logo-->
          <div class="h-45 flex items-center">
              <div class="f-32"> <!--temperary-->
                <span>
                  <a href="/">gitits.to</a>
                </span>
              </div>
          </div>
          <div class="h-4"></div>
          <div class="
            focused-search
            f-28 h-45 w-320 p-10
            flex direction-row items-center
            border-1 border-whitesmoke radius-500 bg-whitesmoke border">
            <span>@</span>
            <input
              id="searchUser"
              style="width: 100%"
              type="text"
              tabindex="1"
              autocomplete="off"
              placeholder="github_username" />
          </div>
        </div>
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
                border-1 border-light-whitesmoke radius-500 border bg-whitesmoke">
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
