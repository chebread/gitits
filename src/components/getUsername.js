const getUsername = () => {
  let data = '';
  const f = user => {
    if (user != undefined && data != user) {
      data = user;
    }
    return data; // undefined 라면은 기존의 값을 가져다가 쓴다
  };
  return f;
};

const f = getUsername();
export default f;
