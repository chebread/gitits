import getPath from '../components/getPath.js';

const getUsername = () => {
  const path = getPath();
  const pathArray = path.split('/'); // string to array
  const username = pathArray[0];
  return username;
};

export default getUsername;
