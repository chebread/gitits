import './content.css';
import useState from '../components/useState.js';
import useEffect from '../components/useEffect.js';
import request from '../components/request.js';
import renderHTML from '../components/renderHTML.js';
import loading from './loading.js';
import errorRoutes from '../routes/errorRoutes.js';
import getUsername from './getUsername.js';
import getParameterYear from './getParameterYear.js';

const content = path => {
  console.time('start timer');
  const pathArray = path.split('/');
  const username = getUsername(pathArray[0]);
  const parameterYear = getParameterYear(
    pathArray[1] === undefined || pathArray[1] === '' ? null : pathArray[1] // null = undefined
  );
  const [totalContributions, setTotalContributions] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState(''); // errorCode
  const [init, setInit] = useState(false); // for loading

  useEffect(() => {
    const utcYear = new Date().getUTCFullYear();
    const isParameter = parameterYear === undefined ? false : true;
    // year excess
    if (isParameter) {
      if (parameterYear < 2008 || parameterYear > utcYear) {
        setIsError(true);
        setErrorCode('YEAR_EXCESS');
        return;
      }
    }
    console.timeEnd('start timer'); // 0.17
    // request
    (async () => {
      const query = {
        query: `query {
          user(login: "${username}") {
            ${`contributionsCollection(from: "${
              isParameter ? parameterYear : utcYear
            }-01-01T00:00:00", to: "${
              isParameter ? parameterYear : utcYear
            }-12-31T23:59:59")`} {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }`,
      };
      const data = await request(query).then(data => data.data);
      console.log(data);
      try {
        const totalContributions =
          data.user.contributionsCollection.contributionCalendar
            .totalContributions;
        setTotalContributions(totalContributions);
      } catch (err) {
        // not found user
        if (data.user === null) {
          setIsError(true);
          setErrorCode('NOT_FOUND_USER');
        } else {
          // other errors
          console.error(err);
        }
      }
      setInit(true); // user loading init
    })();
  }, []);

  const html = `
    <div><a href="/">Back to the home</a></div>
    ${
      init != false && isError === false // loadding and error processing
        ? `<div id="commits">${totalContributions} is ${username}</div>`
        : isError === false
        ? loading()
        : errorRoutes(errorCode)
    }
    <div><a rel="noopener noreferrer" href="https://github.com/${username}" target="_blank">Go to ${username}'s github</div>
  `;
  renderHTML(html, document.querySelector('#root'));
};

export default content;
