import getUsername from './getUsername.js';

const notFoundUser = () => {
  const username = getUsername();
  // 바꿔야 함 (코드 재사용)
  // not found user
  return `${username} does not exist`;
};

export default notFoundUser;
