import './homeMenu.css';
import renderHTML from '../modules/renderHTML.js';

const HomeMenu = element => {
  const html = /*html */ `
        <div>
          <!--items-->
          <div class="f-18 flex direction-row flex-wrap">
            <!--item-->
            <div class="p-l-10">
              <div class="
                items
                p-10 h-30
                flex items-center
                border-1 border-whitesmoke dm-border-whitesmoke radius-500 border bg-whitesmoke dm-bg-whitesmoke">
                <span>
                <a
                  rel="noopener noreferrer"
                  href="https://haneum.notion.site/help-ea713b38b45e49cab235c6f7bd4d20f4"
                  target="_blank">
                  How to use</a>
                </span>
              </div>
            </div>
          </div>
        </div>`;

  renderHTML(html, element);
};

export default HomeMenu;
