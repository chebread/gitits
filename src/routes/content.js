import './content.css';
import useState from '../components/useState.js';
import useEffect from '../components/useEffect.js';
import request from './request.js';
import renderHTML from '../components/renderHTML.js';
import loading from './loading.js';
import errorRoutes from '../routes/errorRoutes.js';
import getUsername from '../components/getUsername.js';
import getParameterYear from '../components/getParameterYear.js';
import usernameMatches from '../components/usernameMatches.js';
import router from '../components/router.js';

const content = path => {
  const pathArray = path.split('/');
  const username = getUsername(pathArray[0]);
  const parameterYear = getParameterYear(
    pathArray[1] === undefined || pathArray[1] === '' ? null : pathArray[1] // null = undefined
  );
  const [contributions, setContributions] = useState({});
  const [errorCode, setErrorCode] = useState(''); // errorCode
  const [init, setInit] = useState(false); // for loading

  console.log(contributions);
  useEffect(() => {
    console.time('start timer');
    // request
    (async () => {
      const response = await request();
      const data = response.data;
      try {
        let obj = {};
        data.user.contributionsCollection.contributionCalendar.weeks.map(a =>
          a.contributionDays.map(
            b => (obj = { ...obj, [b.date]: b.contributionCount })
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

  const isError = errorCode === '' ? false : true;
  const html = /* html */ `
    <div class="app">
      <div class="max-width">
        <!--header-->
        <div class="h-94 p-10 flex direction-column">
          <!--logo-->
          <div class="h-45 flex items-center">
              <div class="f-32"> <!--temperary-->
                <span><a href="/">gitits.to</a></span>
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
              value="${username}"
              autocomplete="off"
              />
          </div>
        </div>
        <!--content-->
        ${
          init != false && isError === false // loadding and error processing
            ? `<div id="commits">${contributions} is ${username}</div>`
            : isError === false
            ? loading()
            : errorRoutes(errorCode)
        }
        <div><a rel="noopener noreferrer" href="https://github.com/${username}" target="_blank">Go to ${username}'s github</div>
        <!--bottom-->
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

export default content;
