import renderHTML from '../components/renderHTML.js';
import request from './request.js';
import useState from '../components/useState.js';
import useEffect from '../components/useEffect.js';
import isSelected from './isSelected.js';
// path parameter type => users/years/ (or users/)

const content = path => {
  const pathArray = path.split('/');
  const [username, setUsername] = useState('');
  const [parameterYear, setParameterYear] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [contributionYears, setContributionYears] = useState([]);

  useEffect(() => {
    const username = pathArray[0];
    const parameterYear =
      pathArray[1] === undefined ? new Date().getFullYear() : pathArray[1];
    const query = {
      query: `query {
          user(login: "${username}") {
            ${`contributionsCollection(from: "${parameterYear}-01-01T00:00:00", to: "${parameterYear}-12-01T00:00:00")`} {
              contributionYears
              contributionCalendar {
                totalContributions
              }
            }
          }
        }`,
    };
    (async () => {
      const data = await request(query).then(data => data.data);
      setTotalContributions(
        data.user.contributionsCollection.contributionCalendar
          .totalContributions
      );
      setContributionYears([
        ...data.user.contributionsCollection.contributionYears,
      ]);
      setUsername(username);
      setParameterYear(parameterYear);
    })();
  }, []);

  const html = `
    <div><a href="/">Back to the home</a></div>
    <div id="commits">${totalContributions} is ${username}</div>
    <div id="years">${contributionYears
      .map(
        item =>
          `<p><a href="${`/${username}/${item}`}">${item} ${
            isSelected(item, parameterYear) ? 'chosen' : ''
          }</a></p>`
      )
      .join('')}
    </div>
  `;
  renderHTML(html, document.querySelector('#root'));
};

export default content;
