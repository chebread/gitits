import renderHTML from '../components/renderHTML.js';
import request from '../components/request.js';
import isSelected from '../components/isSelected.js';

// path parameter type => users/years/ (or users/)
const content = path => {
  const [data, setData] = useState(1); // 어떻게 render 할 것인가?
  const html = `
    <div><a href="/">Back to the home</a></div>
    <div id="commits"></div>
    <div id="years"></div>
  `;
  renderHTML(html, document.querySelector('#root')); // static!
  const pathArray = path.split('/');
  const username = pathArray[0];
  const parameterYear =
    pathArray[1] === undefined ? new Date().getFullYear() : pathArray[1]; // if parameter has no data, append this year data
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
    const userData = await request(query).then(data => {
      return data;
    }); // 이것을 setData 해야 함
    const totalContributions =
      userData.data.user.contributionsCollection.contributionCalendar
        .totalContributions;
    const commits = `${username} is ${totalContributions} commits`;
    renderHTML(commits, document.querySelector('#commits'));
  })();
};

export default content;
