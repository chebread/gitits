const isYearExcess = year => {
  const utcYear = new Date().getUTCFullYear();
  const isParameter = year === undefined ? false : true;
  if (isParameter && (year < 2008 || year > utcYear)) return true;
  return false;
};

export default isYearExcess;
