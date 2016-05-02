// 得到webpack
const webpack = require('atool-build/lib/webpack');

// atool-build内置的webpack配置对象，返回新的webpack配置对象
module.exports = (webpackConfig) => {
  webpackConfig.babel.plugins.push('antd');

  const dev = process.env.NODE_ENV === 'development' || process.argv.findIndex((arg) => arg.includes('hmr')) > 0;
  if (dev) {
    console.log('development 环境');
    webpackConfig.output = Object.assign({}, webpackConfig.output, {
      publicPath: '/',
    });
  }

  // 添加一个 DefinePlugin 来处理项目里面的预留值
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(dev),
      __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
    })
  );

  // Fix ie8 compatibility
  webpackConfig.module.loaders.unshift({
    test: /\.jsx?$/,
    loader: 'es3ify-loader',
  });

  return webpackConfig;
};
