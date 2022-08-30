const getPath = () => {
  let data = '';
  const f = path => {
    if (path != undefined && data != path) {
      data = path;
    }
    return data; // undefined 라면은 기존의 값을 가져다가 쓴다
  };
  return f;
};

const f = getPath();
export default f;
