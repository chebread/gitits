import getPath from './getPath.js';

const getParameterYear = () => {
  const path = getPath();
  const pathArray = path.split('/');
  const parameterYear =
    pathArray[1] === undefined || pathArray[1] === ''
      ? undefined
      : pathArray[1];
  return parameterYear; // 만약 parameter가 전달되지 않았다면 undefined을 반환합니다
};

export default getParameterYear;
