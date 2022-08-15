import notFoundUser from '../routes/notFoundUser.js';
import yearExcess from '../routes/yearExcess.js';

const errorRoutes = errorCode => {
  const staticRoutes = {
    NOT_FOUND_USER: notFoundUser,
    YEAR_EXCESS: yearExcess,
  };
  return staticRoutes[errorCode]();
};

export default errorRoutes;
