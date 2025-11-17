const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (webpackConfig.mode === 'production') {
        webpackConfig.plugins.push(
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html)$/,
            threshold: 10240,
          })
        );
      }
      return webpackConfig;
    },
  },
  babel: {
    presets: [
      ["@babel/preset-env", { "targets": { "browsers": ["last 2 versions"] } }],
      ["@babel/preset-react", { "runtime": "automatic" }]
    ]
  }
};