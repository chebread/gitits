import './content.css';
import useState from '../modules/useState.js';
import useEffect from '../modules/useEffect.js';
import Search from '../components/Search.js';
import Chart from '../components/Chart.js';
import ContentMenu from '../components/ContentMenu.js';
import request from '../modules/request.js';
import renderHTML from '../modules/renderHTML.js';
import errorRoutes from '../modules/errorRoutes.js';
import setPath from '../modules/setPath.js';
import $ from '../modules/selector.js';

// const styled =
//   HtmlTag =>
//   ([style]) =>
//   children => {
//     console.log(HtmlTag, style, children);
//   };
// const Button = styled('button')`
//   color: blue;
//   &:hover {
//     color: red;
//   }
// `;
// Button(`
//   <div>
//     <span>Hello</span>
//   </div>
// `);
const Content = path => {
  const [contributions, setContributions] = useState({});
  const [errorCode, setErrorCode] = useState(''); // errorCode
  const [init, setInit] = useState(false); // for loading

  useEffect(() => {
    // setting path
    setPath(path.split('/'));
    // request
    (async () => {
      const response = await request();
      const data = response.data;
      try {
        let obj = {};
        data.user.contributionsCollection.contributionCalendar.weeks.map(a =>
          a.contributionDays.map(b =>
            b.contributionCount != 0
              ? (obj = { ...obj, [b.date]: b.contributionCount })
              : ''
          )
        );
        if (Object.keys(obj).length === 0) setErrorCode('NOT_CONTRIBUTIONS');
        setContributions({ ...contributions, ...obj }); // { 2021-01-01: 1 }
      } catch (err) {
        // not found user
        if (data.user === null) {
          setErrorCode('NOT_FOUND_USER');
        }
      }
      setInit(true); // user loading init
    })();
  }, []);

  const isError = errorCode === '' ? false : true;
  const html = /* html */ `
    <div class="app">
    <div class="max-w-1024 h-inherit">
      <div id="userSearch"></div>
      <div id="contentMenu"></div>
        <div>
          <div class="p-10">
            ${
              isError === false
                ? /* html */ `
              <div class="w-100p">
                <canvas
                  id="myChart"
                  class="
                    chart
                    w-inherit h-inherit
                    bg-whitesmoke dm-bg-whitesmoke
                    radius-8 border-1 border-light-whitesmoke dm-border-light-whitesmoke border"></canvas>
              </div> `
                : errorRoutes(errorCode)
            }
          </div>
        </div>
      </div>
    </div>
  `;
  renderHTML(html, $('#root'));
  // components rendering
  Search($('#userSearch'));
  ContentMenu($('#contentMenu'));
  if (init != false && isError === false)
    Chart({
      contributions,
      element: $('#myChart'),
    });
};

export default Content;
