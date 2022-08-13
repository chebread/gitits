import renderHTML from '../components/renderHTML.js';
import request from './request.js';
import isSelected from './isSelected.js';
import loading from './loading.js';
import notFoundError from './notFoundError.js';
import useState from '../components/useState.js';
import useEffect from '../components/useEffect.js';
import link from '../components/link.js';

const content = path => {
  // path parameter type => users/years/ (or users/)
  const [username, setUsername] = useState('');
  const [totalContributions, setTotalContributions] = useState(0);
  // const [contributionYears, setContributionYears] = useState([]);
  const [error, setError] = useState(''); // fetching user error
  const [init, setInit] = useState(false);

  useEffect(() => {
    const pathArray = path.split('/'); // string to array
    const username = pathArray[0];
    const parameterYear =
      pathArray[1] === undefined || pathArray[1] === ''
        ? new Date().getFullYear()
        : pathArray[1];
    setUsername(username); // scope is different
    // contributionYears
    const query = {
      query: `query {
          user(login: "${username}") {
            ${`contributionsCollection(from: "${parameterYear}-01-01T00:00:00", to: "${parameterYear}-12-01T00:00:00")`} {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }`,
    };
    (async () => {
      // console.log(1);
      const data = await request(query).then(data => data.data);
      try {
        setTotalContributions(
          data.user.contributionsCollection.contributionCalendar
            .totalContributions
        );
        // setContributionYears([
        //   ...data.user.contributionsCollection.contributionYears,
        // ]);
      } catch (err) {
        setError(data);
      }
      setInit(true); // user loading init
    })();
  }, []);

  // <div id="years">${contributionYears
  //   .map(
  //     item =>
  //       `<p><a href="${`/${username}/${item}`}">${item} ${
  //         isSelected(item, parameterYear) ? 'chosen' : ''
  //       }</a></p>`
  //   )
  //   .join('')}
  // </div>

  const html = `
    <div><a href="/">Back to the home</a></div>
    ${
      init != false && error == '' // loadding and error processing
        ? `<div id="commits">${totalContributions} is ${username}</div>`
        : error == ''
        ? loading({ username })
        : notFoundError({ error, username })
    }
    <div><a rel="noopener noreferrer" href="https://github.com/${username}" target="_blank">Go to ${username}'s github</div>
  `;
  renderHTML(html, document.querySelector('#root'));
};

export default content;
