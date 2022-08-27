import './search.css';
import getUsername from './getUsername.js';

const search = () => {
  const username = getUsername();
  const path = window.location.pathname;
  return /* html */ `
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
  </div>`;
};

export default search;
