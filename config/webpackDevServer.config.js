import paths from './paths.js';

const port = process.env.PORT || 8080;
const devServerConfig = () => {
  return {
    compress: true,
    hot: true,
    server: {
      type: 'https',
      // options: {
      //   ca: './path/to/server.pem',
      //   pfx: './path/to/server.pfx',
      //   key: './path/to/server.key',
      //   cert: './path/to/server.crt',
      //   passphrase: 'webpack-dev-server',
      //   requestCert: true,
      // },
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
  };
};

export default devServerConfig;
