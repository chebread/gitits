const getUsername = () => {
  let pathname = '';
  const f = path => {
    // path가 들어온다면 그 값을 저장한다
    if (path && path != pathname) pathname = path;
    const pathArray = pathname.split('/'); // string to array
    const username = pathArray[0];
    return username;
  };
  return f;
};

const f = getUsername();
export default f;
