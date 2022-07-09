const matches = path => {
  const regexpStr =
    /[a-zA-Z,0-9]([a-zA-Z,0,9,\-]+([a-zA-Z,0-9]))?([a-zA-Z,0-9]?)\/?([0-9]{0,4}([\/]?))?/gi;
  const matched = path.match(regexpStr);
  if (matched === null) return true;
  else {
    if (matched.join() === path) {
      return false;
    } else return true;
  }
};

export default matches;
