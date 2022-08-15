const request = async query => {
  // 이 과정이 끝나야 renderHTML을 할 수 있도록 async/await을 해줌
  const url = `https://api.github.com/graphql`;
  const options = {
    Authorization: `token ${process.env.API_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  const body = query;
  const response = await fetch(url, {
    method: 'POST',
    headers: options,
    body: JSON.stringify(body),
  }).then(data => data.json());

  return response;
};

export default request;
