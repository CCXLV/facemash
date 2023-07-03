const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
  entry: {
    main: './src/static/react/React.jsx',
    rankings: './src/static/react/Rankings.jsx',
    submit: './src/static/react/Submit.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/static/bundle'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, 'src/static/react'),
    },
  },
};
