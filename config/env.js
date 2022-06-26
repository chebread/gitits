import dotenv from 'dotenv';
import paths from './paths.js';

dotenv.config({
  path: paths.dotenv, // .env
});

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env).reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      NODE_ENV: process.env.NODE_ENV || 'development',
      PUBLIC_URL: publicUrl,
    }
  ); // NODE_ENV 등등 모든 것을 지정한다
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
  return { raw, stringified };
}

export default getClientEnvironment;
