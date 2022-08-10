import path from 'path';
import paths from './paths.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESBuildMinifyPlugin from 'esbuild-loader';
import WebpackManifestPlugin from 'webpack-manifest-plugin';
import getClientEnvironment from './env.js';
import webpack from 'webpack';

const webpackConfig = webpackEnv => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const env = getClientEnvironment(paths.publicPath);
  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? 'source-map'
      : isEnvDevelopment && 'cheap-module-source-map', // referenced by esbuild-loader
    entry: {
      main: paths.appAppJs, // src directory
    },
    output: {
      path: isEnvProduction ? paths.appBuild : undefined, // undefined when development mode
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? '[name].[hash:8].js'
        : isEnvDevelopment && '[name].js',
      chunkFilename: isEnvProduction
        ? '[name].[hash:8].chunk.js'
        : isEnvDevelopment && '[name].chunk.js',
      publicPath: paths.publicPath,
      devtoolModuleFilenameTemplate: isEnvProduction // ?
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, '/')
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new ESBuildMinifyPlugin.ESBuildMinifyPlugin({
          target: 'es2015',
          minifyWhitespace: true,
          minifyIdentifiers: true,
          minifySyntax: true, // ?
          sourcemap: true, // source map use
          css: true, // css optimization
        }),
      ],
    },
    resolve: {
      modules: ['node_modules', paths.appNodeModules],
      extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'esbuild-loader',
          exclude: paths.appNodeModules,
          options: {
            target: 'es2015',
          },
        },
        {
          test: /\.css$/i,
          use: [
            isEnvProduction
              ? { loader: MiniCssExtractPlugin.loader }
              : isEnvDevelopment && 'style-loader',
            'css-loader',
          ],
          sideEffects: true, // For css inline import
        },
        {
          test: /\.(png|jpe?g|gif|ico|svg)$/,
          loader: 'url-loader',
          exclude: [/\.(js|mjs)$/, /\.html$/, /\.json$/],
          options: {
            name: '[name].[ext]?[hash:8]',
            limit: 20000,
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true, // ?
                },
              }
            : undefined
        )
      ),
      new WebpackManifestPlugin.WebpackManifestPlugin({
        fileName: 'manifest.json',
        publicPath: paths.publicPath,
      }),
      new webpack.DefinePlugin(env.stringified),
      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css',
        chunkFilename: '[name].[hash:8].chunk.css',
      }),
    ],
  };
};
export default webpackConfig;
