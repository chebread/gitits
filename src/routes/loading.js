import getUsername from '../components/getUsername.js';

const loading = () => {
  const username = getUsername();
  return `
    <div>${username} is loaded...</div>
  `;
};

export default loading;
