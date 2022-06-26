import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath); // 상대경로를 인자로 받습니다.
const publicPath = '/';
const dotenv = resolvePath('.env');
const appPath = resolvePath('.');
const appBuild = resolvePath('dist');
const appHtml = resolvePath('public/index.html');
const appAppJs = resolvePath('src/app.js');
const appSrc = resolvePath('src');
const appNodeModules = resolvePath('node_modules');
const moduleFileExtensions = ['web.mjs', 'mjs', 'web.js', 'js', 'json'];
const appPublic = resolvePath('public');

export default {
  dotenv,
  publicPath,
  appPath,
  appBuild,
  appHtml,
  appAppJs,
  appSrc,
  appNodeModules,
  moduleFileExtensions,
  appPublic,
};
