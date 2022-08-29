import getUsername from './getUsername.js';
import getParameterYear from './getParameterYear.js';

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
  const query = {
    query: `
      query {
        user(login: "${username}") {
          ${`contributionsCollection${
            isParameter
              ? `(from: "${parameterYear}-01-01T00:00:00", to: "${parameterYear}-12-31T23:59:59")`
              : ''
          }`} {
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
  console.log(query);
  const response = await fetch(url, {
    method: 'POST',
    headers: options,
    body: JSON.stringify(query),
  }).then(data => data.json());
  // console.log(response);
  return response;
};

export default request;
