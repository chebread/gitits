const getPath = () => {
  // path parameter type => users/years/ (or users/)
  let path = '';
  const f = a => {
    if (a && path != a) {
      // 현재 path에서 한 번만 값이 초기화됩니다
      path = a;
    }
    return path;
  };
  return f;
};

const f = getPath();
export default f;
