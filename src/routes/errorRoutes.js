import notFoundUser from '../routes/notFoundUser.js';

const errorRoutes = code => {
  const staticRoutes = {
    NOT_FOUND_USER: notFoundUser,
  };
  return staticRoutes[code]();
};

export default errorRoutes;
