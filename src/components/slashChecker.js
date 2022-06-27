const slashChecker = str => {
  const isSlash = str.indexOf('/') + 1 === str.length ? -1 : str.indexOf('/');
  if (isSlash === -1) return false; // Slash가 없음
  else return true; // Slash가 있음
};

export default slashChecker;
