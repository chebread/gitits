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
  /*
    근데 contribution 말고 commit은 거의 불가능 할 것같음
    commit은 어떻게 해야 하는 가?
    case: /user {
      올해의 (to 생략하여) 날날의 contribution를 가져오기 { date: contribution } 의 형태로
      important: {
        github의 contribution와 동일해야 함 (이게 어려움)
      }
    },
    case: /user/yyyy {
      yyyy의 ... (동일)
    },
    case: /user/yyyy-mm {
      yyyy-mm의 ... (동일)
    },
    case: /user/yyyy?to=yyyy {
      yyyy ~ yyyy 까지의 data를 불러오기 (yyyy 마다 object 분립해야 함)
    },
    case: /user/yyyy-mm?to=yyyy-mm {
      ... 상단과 동일
    },
    message: {
      그저 직관적으로 contribution를 보게 하는 그러한 tool로 탈 바꿈하자 (소요시간은 최저 1sec 맞추자)
      이것은 그 사용자가 얼마다 열정적이게 하는지를 보여주는 그러한 툴임
    }
   */
  const query = {
    query: `
      query {
        user(login: "${username}") {
          ${`contributionsCollection(from: "${
            isParameter ? parameterYear : utcYear
          }-01-01T00:00:00", to: "${
            isParameter ? parameterYear : utcYear
          }-12-31T23:59:59")`} {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }`,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: options,
    body: JSON.stringify(query),
  }).then(data => data.json());
  // console.log(response);
  return response;
};

export default request;
