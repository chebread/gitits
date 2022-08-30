import getPath from './getPath.js';

const getParameterYear = () => {
  const pathArray = getPath();
  const parameterYear =
    pathArray[1] === undefined || pathArray[1] === ''
      ? undefined
      : pathArray[1];
  return parameterYear;
};

export default getParameterYear;
