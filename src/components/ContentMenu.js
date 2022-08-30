import './contentMenu.css';
import useState from '../modules/useState.js';
import renderHTML from '../modules/renderHTML.js';
import getUsername from '../modules/getUsername.js';
import router from '../modules/router.js';
import $ from '../modules/selector.js';
import $all from '../modules/selectorAll.js';
const ContentMenu = () => {
  const username = getUsername();
  const [yearToggle, setYearToggle] = useState(false);
  const html = /* html */ `
      <div style="padding: 0 10px 0 10px;">
        <div class="f-18 flex direction-row">
          <div class="p-r-10">
            <div class="
              items
              p-10 h-30
              flex items-center
              border-1 border-whitesmoke dm-border-whitesmoke radius-500 border bg-whitesmoke dm-bg-whitesmoke">
              <button id="yearBtn">
                <span>View by year</span>
              </button>
            </div>
          </div>
          ${
            yearToggle
              ? /* html */ `<div class="flex direction-row overflow-scroll w-100p">
                  ${[
                    2022, 2021, 2020, 2019, 2016, 2015, 2014, 2013, 2012, 2011,
                    2010, 2009, 2008,
                  ]
                    .map(
                      year => /* html */ `
                      <div class="p-r-10">
                        <div class="
                          items
                          p-10 h-30
                          flex items-center
                          border-1 border-whitesmoke dm-border-whitesmoke radius-500 border bg-whitesmoke dm-bg-whitesmoke">
                          <button id="yearChildBtn" value="${year}">
                            ${year}
                          </button>
                        </div>
                      </div>`
                    )
                    .join('')}
                </div>`
              : ''
          }
          <div class="">
            <div class="
              items
              p-10 h-30
              flex items-center
              border-1 border-whitesmoke dm-border-whitesmoke radius-500 border bg-whitesmoke dm-bg-whitesmoke">
              <span>
                <a
                  rel="noopener noreferrer"
                  href="https://github.com/${username}"
                  target="_blank">
                  ${username}'s github
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
  `;
  renderHTML(html, $('#contentMenu'));
  $('#yearBtn').addEventListener('click', e => {
    if (yearToggle === false) {
      setYearToggle(true);
    } else {
      setYearToggle(false);
    }
  });
  $all('#yearChildBtn').forEach(item => {
    item.addEventListener('click', e => {
      const year = e.target.value;
      router(`/${username}/${year}`);
    });
  });
};

export default ContentMenu;
