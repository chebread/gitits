const matches = path => {
  const regexpStr =
    /[a-zA-Z,0-9]([a-zA-Z,0,9,\-]+([a-zA-Z,0-9]))?([a-zA-Z,0-9]?)\/?([0-9]{4}([\/]?))?/gi;
  // user/yyyy 처럼 내자리 여야함
  const matched = path.match(regexpStr);
  if (matched === null) return true;
  else {
    if (matched.join() === path) {
      return false;
    } else return true;
  }
};

export default matches;
