import './home.css';
import renderHTML from '../components/renderHTML.js';
import usernameMatches from './usernameMatches.js';
import router from '../components/router.js';

const home = () => {
  // html comments is code highlighting for the VSCode extensions
  const html = /* html */ `
    <div class="app-container">
      <div class="flex direction-column">
        <div class="title">gitits.to</div> <!--to separate / to use svg file-->
      </div>
    </div>
  `;
  renderHTML(html, document.querySelector('#root'));
  // document.querySelector('#searchUser').addEventListener('keydown', e => {
  //   const key = e.keyCode;
  //   if (key === 13) {
  //     const value = e.target.value;
  //     const isMatches = usernameMatches(value);
  //     if (isMatches) {
  //       e.target.value = '';
  //     } else {
  //       router(`/${value}`);
  //     }
  //   }
  // });
};

export default home;

{
  /* <div class="search-input">
          <span>@</span><input id="searchUser" type="text" autocomplete="off" />
        </div> */
}
