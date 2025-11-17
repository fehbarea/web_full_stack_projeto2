// webpack.config.js
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  //- Compressao de arquivos estativos
  mode: 'production', 

  entry: './src/index.js',

  output: {

    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ]
  },

  resolve: { 
      extensions: ['.js', '.jsx']
  },

  //- Compressao de respostas do servidor
  plugins: [
    new CompressionPlugin({ 
        algorithm: 'gzip', 
        test: /\.(js|css|html)$/,
        threshold: 10240 
    }),
  ],

};