const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3001/',
    clean: true,
  },
  cache: false,
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png'],
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'cards',
      filename: 'remoteEntry.js',
      exposes: {
        './AddPlacePopup': './src/components/AddPlacePopup.js',
        './Card': './src/components/Card.js',
        './ImagePopup': './src/components/ImagePopup.js',
        './Main': './src/components/Main.js',
      },
      remotes: {
        'lib': 'lib@http://localhost:3000/remoteEntry.js',
      },
    })
  ],
};