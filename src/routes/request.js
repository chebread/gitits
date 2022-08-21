import getUsername from '../components/getUsername.js';
import getParameterYear from '../components/getParameterYear.js';

const request = async () => {
  const API_KEY = process.env.API_KEY;
  const username = getUsername();
  const parameterYear = getParameterYear();
  const isParameter = parameterYear === undefined ? false : true;
  const utcYear = new Date().getUTCFullYear();

  const url = `https://api.github.com/graphql`;
  const options = {
    Authorization: `token ${API_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  // collection에서 to 생략하면 from에서 딱 1년 계산됨
  // 요청해야 하는 것은 user의 날마다의 total commit임 (이것을 어떻게 불러올 것인가)
  // 그리고 이것을 object로 하여 graph에 toss의 stock graph 처럼 확인한다
  const query = {
    query: `
      query {
        user(login: "${username}") {
          ${`contributionsCollection(from: "${
            isParameter ? parameterYear : utcYear
          }-01-01T00:00:00")`} {
            totalCommitContributions
          }
        }
      }`,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: options,
    body: JSON.stringify(query),
  }).then(data => data.json());
  const data = response.data; // completly user data
  return data;
};

export default request;

// totalCommitContributions

// user(login: "${username}") {
// ${`contributionsCollection(from: "${
//   isParameter ? parameterYear : utcYear
// }-01-01T00:00:00", to: "${
//   isParameter ? parameterYear : utcYear
// }-12-31T23:59:59")`} {
//     commitContributionsByRepository {
//       contributions {
//         totalCount
//       }
//     }
//   }
// }

// contributionCalendar {
//   weeks {
//     contributionDays {
//       contributionCount
//     }
//   }
// }
