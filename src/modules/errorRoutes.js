import NotFoundUser from '../components/NotFoundUser.js';
import NotFoundContributions from '../components/NotFoundContributions.js';

const errorRoutes = code => {
  const staticRoutes = {
    NOT_FOUND_USER: NotFoundUser,
    NOT_CONTRIBUTIONS: NotFoundContributions,
  };
  return staticRoutes[code]();
};

export default errorRoutes;
