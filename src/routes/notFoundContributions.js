import getUsername from '../components/getUsername.js';

const notFoundContributions = () => {
  const username = getUsername();
  // 바꿔야 함 (코드 재사용)
  // not found user
  return `${username} does not contributions`;
};

export default notFoundContributions;
