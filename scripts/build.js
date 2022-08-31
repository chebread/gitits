import webpack from 'webpack';
import fs from 'fs-extra';
import paths from '../config/paths.js';
import webpackConfig from '../config/webpack.config.js';

const config = webpackConfig('production'); // start는 원래 development 환경에서 진행하기 때문에 그냥 인자를 이것으로만 줘도 괜찮다.
const compiler = webpack(config);
fs.emptyDirSync(paths.appBuild); // build directory remove
fs.copySync(paths.appPublic, paths.appBuild, {
  dereference: true,
  filter: file => file !== paths.appHtml,
});
const build = () => {
  compiler.run();
  console.log(compiler);
};
build();
