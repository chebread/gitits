import notFoundUser from '../routes/notFoundUser.js';
import yearExcess from '../routes/yearExcess.js';

const errorRoutes = code => {
  const staticRoutes = {
    NOT_FOUND_USER: notFoundUser,
    YEAR_EXCESS: yearExcess,
  };
  return staticRoutes[code]();
};

export default errorRoutes;
