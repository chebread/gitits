import getParameterYear from './getParameterYear.js';

const yearExcess = () => {
  const year = getParameterYear();
  return `${year} is year excess`;
};

export default yearExcess;
