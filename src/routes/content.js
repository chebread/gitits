import appendHTML from '../components/appendHTML.js';
import renderHTML from '../components/renderHTML.js';
import request from '../components/request.js';
import slashChecker from '../components/slashChecker.js';

// new features
// /chebread 면 2021 부터 2022의 합산된 commits를 보여주고
// /chebread/2022 면 2022의 commits을 보여주기!
const content = path => {
  // path는 오직 user/year 형식으로만 온다는 점임
  const render = () => {
    const html = `
      <div><a href="/">Back to the home</a></div>
      <div id="commits"></div>
      <div id="years"></div>
    `;
    renderHTML(html, document.querySelector('#root'));
    const isSlash = slashChecker(path); // true => there is slash || false => there is no slash (단 chebread/는 chebread와 같은 의미라 false임)
    const username = isSlash
      ? path.substring(0, path.indexOf('/'))
      : path.indexOf('/') + 1 === path.length
      ? path.substring(0, path.length - 1) // 만약 chebread/ 라면은 isSlash는 false라 path에서 처리해줌
      : path; // matcheds 로직 구현하면 이것도 없어짐
    const thisYear = new Date().getFullYear();
    const parameterYear = isSlash // chebread/ 는 false라 영향을 받지 않아요
      ? path.substring(path.indexOf('/') + 1, path.length)
      : undefined; // 효율적으로 계산을 하지 않습니다
    // parameter가 있다면 숫자가 초기화되고, 없다면 undefined임
    const query = {
      query: `query {
          user(login: "${username}") {
            ${
              isSlash // 있다면 파라미터로 받은 것을 받고 아니면 그냥 현재 연도를 넘겨줘서 값을 받는다
                ? `contributionsCollection(from: "${parameterYear}-01-01T00:00:00", to: "${parameterYear}-12-01T00:00:00")`
                : `contributionsCollection(from: "${thisYear}-01-01T00:00:00", to: "${thisYear}-12-01T00:00:00")`
            } {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }`,
    };
    //              contributionYears
    const response = request(query);
    response
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        if (!(data.errors === undefined)) {
          renderHTML(`Errors`, document.querySelector('#commits')); // username error / year arguement error 대응되는 msg 추가하기!1
          return;
        }
        const content = `${username} is ${data.data.user.contributionsCollection.contributionCalendar.totalContributions} commits`;
        renderHTML(content, document.querySelector('#commits'));
        const query2 = {
          query: `query {
              user(login: "${username}") {
                contributionsCollection {
                  contributionYears
                }
              }
            }`,
        };
        const response2 = request(query2);
        response2
          .then(response => response.json())
          .then(data => {
            const content = `
              ${data.data.user.contributionsCollection.contributionYears
                .map(
                  item =>
                    `<p><a href="${`/${username}/${item}`}">${item} ${
                      isSlash
                        ? item == parameterYear // 선택된 년도를 알려주는 로직
                          ? 'Chosen'
                          : ''
                        : item == thisYear
                        ? 'Chosen'
                        : ''
                    }</a></p>`
                )
                .join('')}
            `;
            renderHTML(content, document.querySelector('#years'));
          });
      });
  };
  render();
};

export default content;

// ${data.data.user.contributionsCollection.contributionYears
//   .map(item => `<li><a href="/${username}/${item}">${item}</a></li>`) // 현재 year는 colored 된 체로 할것인데, chebread는 그냥 thisYear 참조해서 colored 할것임
//   // 2022로 url 을 접근하면 그냥 api가 다르게 불러오게 됨 (routes는 그냥 content를 넘겨주고 (즉 /chegread/202 도 그냥 content(/chebread/202)를 넘겨준것과 같은 효과임 근데 그게 잘 연결되게끔 로직을 구현하것임))
//   .join('')}
