import renderHTML from '../modules/renderHTML.js';
import Search from '../components/Search.js';
import HomeMenu from '../components/HomeMenu.js';
import $ from '../modules/selector.js';

const Home = () => {
  // html comments is code highlighting for the VSCode extensions
  const html = /* html */ `
    <div class="app">
      <div class="max-w-1024 h-inherit">
        <div id="userSearch"></div>
        <div id="homeMenu"></div>
      </div>
    </div>
  `;
  renderHTML(html, $('#root'));
  Search($('#userSearch'));
  HomeMenu($('#homeMenu'));
};

export default Home;
