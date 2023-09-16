const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      Array: path.resolve(__dirname, 'src/array/'),
      Cite: path.resolve(__dirname, 'src/cite/'),
      Conditions: path.resolve(__dirname, 'src/conditions/'),
      Draw: path.resolve(__dirname, 'src/draw/'),
      Export: path.resolve(__dirname, 'src/export/'),
      Foreign: path.resolve(__dirname, 'src/foreign/'),
      Forms: path.resolve(__dirname, 'src/forms/'),
      History: path.resolve(__dirname, 'src/history/'),
      Infobar: path.resolve(__dirname, 'src/infobar/'),
      Math: path.resolve(__dirname, 'src/math/'),
      Menu: path.resolve(__dirname, 'src/menu/'),
      Parse: path.resolve(__dirname, 'src/parse/'),
      Partners: path.resolve(__dirname, 'src/partners/'),
      Refresh: path.resolve(__dirname, 'src/refresh/'),
      Settings: path.resolve(__dirname, 'src/settings/'),
      Time: path.resolve(__dirname, 'src/time/'),
      Undo: path.resolve(__dirname, 'src/undo/'),
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Values: path.resolve(__dirname, 'src/values/'),
      App$: path.resolve(__dirname, 'src/App.tsx'),
    },
    modules: ['node_modules'],
    extensions: [ '.tsx', '.ts', '.js' ]
  }
}
