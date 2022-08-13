const matches = path => {
  const regexpStr =
    /(^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})\/?([0-9]{4}([\/]?))?/gi; // https://github.com/shinnn/github-username-regex
  // /([a-zA-Z,0-9]+([a-zA-Z,0,9,\-]([a-zA-Z,0-9]))?([a-zA-Z,0-9]?)+)\/?([0-9]{4}([\/]?))?/gi;
  ///(^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})\/?([0-9]{4}([\/]?))?/gi;

  // /([a-zA-Z,0-9]+([a-zA-Z,0,9,\-]([a-zA-Z,0-9]))?([a-zA-Z,0-9]?)+)\/?([0-9]{4}([\/]?))?/gi;
  // /[a-zA-Z,0-9]+([a-zA-Z,0,9,\-]+([a-zA-Z,0-9]))?([a-zA-Z,0-9]?)+\/?([0-9]{4}([\/]?))?/gi;
  // /[a-zA-Z,0-9]([a-zA-Z,0,9,\-]+([a-zA-Z,0-9]))?([a-zA-Z,0-9]?)+\/?([0-9]{4}([\/]?))?/gi;
  // /[a-zA-Z,0-9]([a-zA-Z,0,9,\-]+([a-zA-Z,0-9]))?([a-zA-Z,0-9]?)\/?([0-9]{4}([\/]?))?/gi;
  // [a-zA-Z,0-9]([a-zA-Z,0,9,\-]+([a-zA-Z,0-9]))?([a-zA-Z,0-9])+
  //(^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})\/?([0-9]{4}([\/]?))?
  // user-user/yyyy 처럼 내자리 여야함
  const matched = path.match(regexpStr);
  if (matched === null) return true;
  else {
    if (matched.join() === path) {
      return false;
    } else return true;
  }
};

export default matches;
