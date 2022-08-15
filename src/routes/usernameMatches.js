const usernameMatches = username => {
  // user/yyyy가 아닌 user만 받기 위해서 따로 함수 선언
  const regexpStr = /(^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})/gi;
  const matched = username.match(regexpStr);
  if (matched === null) return true;
  else {
    if (matched.join() === username) {
      return false;
    } else return true;
  }
};

export default usernameMatches;
