const getPath = () => {
  // path parameter type => users/years/ (or users/)
  // 이것을 클로저로 구현해야 함 (routes에서 처리하면 될꺼 같음 (한번 렌더링 되는 컴포넌트를 찾자))
  const path = window.location.pathname.substring(
    1,
    window.location.pathname.length
  );
  return path;
};

export default getPath;
