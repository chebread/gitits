import './content.css';
import useState from '../components/useState.js';
import useEffect from '../components/useEffect.js';
import getUsername from '../components/getUsername.js';
import getParameterYear from '../components/getParameterYear.js';
import request from '../components/request.js';
import renderHTML from '../components/renderHTML.js';
import loading from './loading.js';
import errorRoutes from '../components/errorRoutes.js';

const content = () => {
  const username = getUsername();
  const parameterYear = getParameterYear();
  const [totalContributions, setTotalContributions] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState(''); // errorCode
  const [init, setInit] = useState(false); // for loading

  useEffect(() => {
    const utcYear = new Date().getUTCFullYear();
    const isParameter = parameterYear === null ? false : true; // 파라미터가 있는지 없는지 확인합니다
    if (isParameter) {
      // year excess
      if (parameterYear < 2008 || parameterYear > utcYear) {
        setIsError(true);
        setErrorCode('year');
        return;
      }
    }
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
      try {
        const totalContributions =
          data.user.contributionsCollection.contributionCalendar
            .totalContributions;
        setTotalContributions(totalContributions);
      } catch (err) {
        // not found user
        if (data.user === null) {
          setIsError(true);
          setErrorCode('user');
        } else {
          // 혹시나 다른 에러 발생시
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
