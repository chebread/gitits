const request = query => {
  const url = `https://api.github.com/graphql`;
  const options = {
    Authorization: `token ${process.env.API_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  const body = query;
  return fetch(url, {
    method: 'POST',
    headers: options,
    body: JSON.stringify(body),
  }); // fetch의 결과를 리턴한다
};

export default request;
