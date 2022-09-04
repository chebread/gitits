import './search.css';
import getUsername from '../modules/getUsername.js';
import renderHTML from '../modules/renderHTML.js';
import usernameMatches from '../modules/usernameMatches.js';
import router from '../modules/router.js';
import $ from '../modules/selector.js';

const Search = element => {
  const username = getUsername();
  const path = window.location.pathname;
  const html = /* html */ `
    <div class="h-94 p-10 flex direction-column">
      <div class="h-45 flex items-center">
        <div class="f-32">
          <span>
            <a href="/">gitits</a>
          </span>
        </div>
      </div>
      <div class="h-4"></div>
      <div class="
        search
        f-28 h-45 w-320 p-10
        flex direction-row items-center
        border-1 border-whitesmoke dm-border-whitesmoke radius-500 bg-whitesmoke dm-bg-whitesmoke border">
        <span>@</span>
        <input
          id="searchUser"
          class="w-100p"
          type="text"
          value="${path === '/' ? '' : username}"
          tabindex="1"
          autocomplete="off"
          placeholder="github_username" />
      </div>
    </div>
  `;
  renderHTML(html, element);
  $('#searchUser').addEventListener('keydown', e => {
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

export default Search;
