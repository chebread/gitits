import webpack from 'webpack';
import fs from 'fs-extra';
import paths from '../config/paths.js';
import webpackConfig from '../config/webpack.config.js';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import '../config/env.js';

const config = webpackConfig('production'); // start는 원래 development 환경에서 진행하기 때문에 그냥 인자를 이것으로만 줘도 괜찮다.
const configWithSmp = new SpeedMeasurePlugin().wrap(config);
configWithSmp.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].[hash:8].css',
    chunkFilename: '[name].[hash:8].chunk.css',
  })
);
const compiler = webpack(configWithSmp);
fs.emptyDirSync(paths.appBuild); // build directory remove
fs.copySync(paths.appPublic, paths.appBuild, {
  dereference: true,
  filter: file => file !== paths.appHtml,
});
const build = () => {
  compiler.run();
};
build();
