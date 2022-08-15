import notFoundUser from '../routes/notFoundUser.js';
import yearExcess from '../routes/yearExcess.js';

const errorRoutes = errorCode => {
  const staticRoutes = {
    user: notFoundUser,
    year: yearExcess,
  };
  return staticRoutes[errorCode]();
};

export default errorRoutes;
