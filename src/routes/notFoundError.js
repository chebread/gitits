const notFoundError = ({ error, username }) => {
  if (error.user === null) {
    // not found user
    return `${username} does not exist`;
  }
};

export default notFoundError;
