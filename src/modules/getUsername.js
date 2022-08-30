import getPath from './getPath.js';

const getUsername = () => {
  const pathArray = getPath();
  const username = pathArray[0];
  return username;
};

export default getUsername;
