const getPath = () => {
  // path parameter type => users/years/ (or users/)
  // let path = '';
  // const f = url => {
  //   if (url && path != url) {
  //     // 현재 path에서 한 번만 값이 초기화됩니다
  //     path = url;
  //   }
  //   return path;
  // };
  // return f;
  const path = window.location.pathname.substring(
    1,
    window.location.pathname.length
  ); // 그냥 이렇게 합니다 (보편적인 path라)
  return path;
};

// const f = getPath();
export default getPath;
