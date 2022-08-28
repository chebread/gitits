import './content.css';
import useState from '../components/useState.js';
import useEffect from '../components/useEffect.js';
import getUsername from '../components/getUsername.js';
import getParameterYear from '../components/getParameterYear.js';
import request from './request.js';
import renderHTML from '../components/renderHTML.js';
import search from '../components/search.js';
import errorRoutes from '../routes/errorRoutes.js';
import usernameMatches from '../components/usernameMatches.js';
import router from '../components/router.js';
import chart from './chart.js';

const content = path => {
  const pathArray = path.split('/');
  const username = getUsername(pathArray[0]);
  const parameterYear = getParameterYear(
    pathArray[1] === undefined || pathArray[1] === '' ? null : pathArray[1] // null = undefined
  ); // setPath로 치환화
  console.log(
    parameterYear,
    pathArray[1] === undefined || pathArray[1] === '' ? null : pathArray[1]
  );
  const [contributions, setContributions] = useState({});
  const [errorCode, setErrorCode] = useState(''); // errorCode
  const [init, setInit] = useState(false); // for loading
  const [yearToggle, setYearToggle] = useState(false);

  useEffect(() => {
    console.time('start timer');
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
        setContributions({ ...contributions, ...obj }); // { 2021-01-01: 1 }
      } catch (err) {
        // not found user
        if (data.user === null) {
          setErrorCode('NOT_FOUND_USER');
        }
      }
      setInit(true); // user loading init
      console.timeEnd('start timer');
    })();
  }, []);

  const months = [
    2022, 2021, 2020, 2019, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
    2008,
  ];
  const isError = errorCode === '' ? false : true;
  const html = /* html */ `
    <div class="app">
      <div class="max-w-1024 h-inherit">
        <!--header-->
        ${search()}
        <!--menus-->
        <div>
      <!--items-->
      <div class="f-18 flex direction-row" style="padding: 0 10px 0 10px">
        <!--item-->
        <div class="p-r-10">
          <div class="
            hovered-item
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
                ${months
                  .map(
                    year => `
                    <div class="p-r-10">
                      <div class="
                        hovered-item
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
        <!--item-->
        <div class=""> <!--no use p-r-10 -->
          <div class="
            hovered-item
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
        <!--content-->
        <div class="p-10">
          ${
            isError === false
              ? /* html */ `
            <div class="w-100p">
              <canvas id="myChart" class="h-inherit viewer bg-whitesmoke dm-bg-whitesmoke radius-8 border-1 border-light-whitesmoke dm-border-light-whitesmoke border w-inherit"></canvas>
            </div> `
              : errorRoutes(errorCode)
          }
        </div>
        <!--bottom-->
      </div>
    </div>
  `;
  renderHTML(html, document.querySelector('#root'));
  // other components rendering
  if (init != false && isError === false) chart(contributions); // 로딩이 정상적으로 작동 되었음
  // event handles
  document.querySelector('#yearBtn').addEventListener('click', e => {
    if (yearToggle === false) {
      setYearToggle(true);
    } else {
      setYearToggle(false);
    }
  });
  document.querySelectorAll('#yearChildBtn').forEach(item => {
    item.addEventListener('click', e => {
      const year = e.target.value;
      router(`/${username}/${year}`);
    });
  });
  // console.log(yearBtnToggle);
  document.querySelector('#searchUser').addEventListener('keydown', e => {
    const key = e.keyCode;
    if (key === 13) {
      const value = e.target.value;
      const isMatches = usernameMatches(value);
      if (isMatches) {
        e.target.value = username;
      } else {
        router(`/${value}`);
      }
    }
  });
};

export default content;

// ${
//   init != false && isError === false // loadding and error processing
//     ? /* html */ `
//     <div class="chart h-512 w-100p">
//       <canvas id="myChart" class="h-inherit viewer bg-whitesmoke dm-bg-whitesmoke radius-8 border-1 border-light-whitesmoke dm-border-light-whitesmoke border w-inherit"></canvas>
//     </div>
//     ` // 완전한 data만 들어가게 된다는 점
//     : isError === false
//     ? loading()
//     : errorRoutes(errorCode)
// }
