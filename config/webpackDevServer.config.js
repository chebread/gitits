import paths from './paths.js';

const port = process.env.PORT || 8080;
const DEFAULT_BROWSER = 'Google Chrome';

const devServerConfig = () => {
  return {
    compress: true,
    hot: true,
    server: {
      type: 'https',
    },
    static: {
      directory: paths.appPublic,
    },
    client: {
      logging: 'none',
      overlay: true,
    },
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicPath,
    },
    port,
    open: {
      app: {
        name: DEFAULT_BROWSER,
      },
    },
  };
};

export default devServerConfig;
