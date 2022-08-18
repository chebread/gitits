import './content.css';
import useState from '../components/useState.js';
import useEffect from '../components/useEffect.js';
import request from './request.js';
import renderHTML from '../components/renderHTML.js';
import loading from './loading.js';
import errorRoutes from '../routes/errorRoutes.js';
import getUsername from './getUsername.js';
import getParameterYear from './getParameterYear.js';

const content = path => {
  const pathArray = path.split('/');
  const parameterYear = getParameterYear(
    pathArray[1] === undefined || pathArray[1] === '' ? null : pathArray[1] // null = undefined
  );
  const username = getUsername(pathArray[0]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [errorCode, setErrorCode] = useState(''); // errorCode
  const [init, setInit] = useState(false); // for loading

  useEffect(() => {
    console.time('start timer');
    // request
    (async () => {
      const data = await request();
      console.log(data);
      try {
        const totalContributions =
          data.user.contributionsCollection.contributionCalendar
            .totalContributions;
        setTotalContributions(totalContributions);
      } catch (err) {
        // not found user
        if (data.user === null) {
          setErrorCode('NOT_FOUND_USER');
        } else {
          // other errors
          console.error(err);
          setErrorCode(err);
        }
      }
      setInit(true); // user loading init
      console.timeEnd('start timer'); // 0.17
    })();
  }, []);

  const isError = errorCode === '' ? false : true;
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
