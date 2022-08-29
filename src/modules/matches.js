const matches = path => {
  // user-user/yyyy
  const regexpStr =
    /(^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})\/?([0-9]{4}([\/]?))?/gi; // https://github.com/shinnn/github-username-regex
  const matched = path.match(regexpStr);
  if (matched === null) return true;
  else {
    if (matched.join() === path) {
      return false;
    } else return true;
  }
};

export default matches;
