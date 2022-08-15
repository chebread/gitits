import getParameterYear from '../components/getParameterYear.js';

const yearExcess = () => {
  const parameterYear = getParameterYear();
  return `${parameterYear} is year excess`;
};

export default yearExcess;
