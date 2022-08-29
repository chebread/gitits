import renderHTML from '../modules/renderHTML.js';
import Search from '../components/Search.js';
import HomeMenu from '../components/HomeMenu.js';

const Home = () => {
  // html comments is code highlighting for the VSCode extensions
  const str = `style="{color: red}; :hover { color: blue }"`;
  const html = /* html */ `
    <div class="app" ${str}>
      <div class="max-w-1024 h-inherit">
        <div id="userSearch"></div>
        <div id="homeMenu"></div>
      </div>
    </div>
  `;
  renderHTML(html, document.querySelector('#root'));
  Search();
  HomeMenu();
};

export default Home;
