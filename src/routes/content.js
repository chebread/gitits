import renderHTML from '../components/renderHTML.js';
import request from '../components/request.js';

// new features
// /chebread 면 2021 부터 2022의 합산된 commits를 보여주고
// /chebread/2022 면 2022의 commits을 보여주기!
const content = path => {
  // path는 오직 user/year 형식으로만 온다는 점임
  const render = () => {
    const html = `
      <div><a href="/">Back to the home</a></div>
      <div id="commits"></div>
    `;
    renderHTML(html, document.querySelector('#root'));
    const isSlash =
      path.indexOf('/') + 1 === path.length ? -1 : path.indexOf('/'); // chebread/ 는 chebread 로 인식되기 위해서 수정된 로직
    // matcheds 로직 구현하면 이것도 없어짐
    const username = path.substring(
      0,
      isSlash === -1
        ? path.indexOf('/') + 1 === path.length
          ? path.length - 1
          : path.length
        : isSlash
    ); // chebread/ 는 chebread로 인식됨
    const parameterYear = path.substring(
      isSlash + 1,
      path.indexOf('/', isSlash + 1) === -1
        ? path.length
        : path.indexOf('/', isSlash + 1)
    ); // year의 인자
    // console.log(parameterYear);
    const query = {
      query: `query {
          user(login: "${username}") {
            ${
              isSlash === -1
                ? `contributionsCollection(from: "${new Date().getFullYear()}-01-01T00:00:00", to: "${new Date().getFullYear()}-12-01T00:00:00")`
                : `contributionsCollection(from: "${parameterYear}-01-01T00:00:00", to: "${parameterYear}-12-01T00:00:00")`
            } {
              contributionYears
              contributionCalendar {
                totalContributions
              }
            }
          }
        }`,
    };
    // username,
    // isSlash === -1 ? thisYear : parameterYear
    const response = request(query);
    // /chebread/ 라는 url은 그냥 /chebread와 동일한 결과를 나타냄 (기본값은 2022) parameter year가 없으면 기본값은 -1 임 그래서 2022를 넘겨줌
    response
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        if (!(data.errors === undefined)) {
          renderHTML(`Errors`, document.querySelector('#commits')); // username error / year arguement error 대응되는 msg 추가하기!1
          return;
        }
        const content = `
          ${username} is ${
          data.data.user.contributionsCollection.contributionCalendar
            .totalContributions
        } commits<br/>
          ${data.data.user.contributionsCollection.contributionYears
            .map(item => `<li><a href="/${username}/${item}">${item}</a></li>`) // 현재 year는 colored 된 체로 할것인데, chebread는 그냥 thisYear 참조해서 colored 할것임
            // 2022로 url 을 접근하면 그냥 api가 다르게 불러오게 됨 (routes는 그냥 content를 넘겨주고 (즉 /chegread/202 도 그냥 content(/chebread/202)를 넘겨준것과 같은 효과임 근데 그게 잘 연결되게끔 로직을 구현하것임))
            .join('')}
        `;
        renderHTML(content, document.querySelector('#commits'));
      });
  };
  render();
};

export default content;
