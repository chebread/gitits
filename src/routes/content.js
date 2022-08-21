import './content.css';
import useState from '../components/useState.js';
import useEffect from '../components/useEffect.js';
import request from './request.js';
import renderHTML from '../components/renderHTML.js';
import loading from './loading.js';
import errorRoutes from '../routes/errorRoutes.js';
import getUsername from '../components/getUsername.js';
import getParameterYear from '../components/getParameterYear.js';

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
      try {
        const data = response.data;
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
  const html = `
    <div><a href="/">Back to the home</a></div>
    ${
      init != false && isError === false // loadding and error processing
        ? `<div id="commits">${contributions} is ${username}</div>`
        : isError === false
        ? loading()
        : errorRoutes(errorCode)
    }
    <div><a rel="noopener noreferrer" href="https://github.com/${username}" target="_blank">Go to ${username}'s github</div>
  `;
  renderHTML(html, document.querySelector('#root'));
};

export default content;
