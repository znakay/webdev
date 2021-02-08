const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtcractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDeveloypment = process.env.NODE_ENV === 'development';

const filename = (extention) => (isDeveloypment ? `[name].${extention}` : `[name].[hash].${extention}`);

const cssLoaders = (preprocessor) => {
  const loaders = [
    {
      loader: MiniCssExtcractPlugin.loader,
    },
    'css-loader',
  ];

  if (preprocessor) loaders.push(preprocessor);

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    swiper: './js/swiper/index.js',
    main: './js/index.js',
  },
  output: {
    publicPath: '',
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtcractPlugin({
      filename: filename('css'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.png'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      { test: /\.html$/i, use: 'html-loader' },
      { test: /\.css$/i, use: cssLoaders() },
      { test: /\.s[ac]ss$/i, use: cssLoaders('sass-loader') },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  devServer: {
    port: 3000,
    open: true,
  },
};
