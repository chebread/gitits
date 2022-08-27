import notFoundUser from './notFoundUser.js';
import notFoundContributions from './notFoundContributions.js';
const errorRoutes = code => {
  const staticRoutes = {
    NOT_FOUND_USER: notFoundUser,
    NOT_CONTRIBUTIONS: notFoundContributions,
  };
  return staticRoutes[code]();
};

export default errorRoutes;
