/* eslint-disable */
var hot = / --hot/.test(process.env.npm_lifecycle_script);
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var configs = [
  {
    devtool: 'inline-source-map',
    entry: [
       './app/client/entry',
    ],
    output: {
      path: __dirname + '/public',
      filename: 'app.js',
      publicPath: 'http://localhost:8082/'
    },
    plugins: [
      new ExtractTextPlugin("style.css", { allChunks: true })
    ],
    sasslint: {
      configFile: '.sass-lint.yml'
    },
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint',
          include: path.join(__dirname, 'app')
        },
        {
          test: /\.s?css$/,
          loader: 'sasslint',
          include: path.join(__dirname, 'app')
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loader: (hot ? 'react-hot!' : '') + 'babel',
          include: path.join(__dirname, 'app')
        },
        {
          test: /\.s?css$/,
          loaders: [
            ExtractTextPlugin.extract('style'),
            'css',
            'autoprefixer?{"browsers":["> 5%","last 2 versions","ie 8"]}',
            'sass?includePaths[]=./node_modules'
          ]
        },
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
  }
];

if (!hot) {
  configs.push({
    name: "server-side rendering",
    entry: './server_src/server/page.js',
    target: "node",
    output: {
      filename: "server_build/server/page.compiled.js",
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: [
            path.join(__dirname, 'app'),
            path.join(__dirname, 'server_src')
          ]

        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.s?css$/,
          loader: 'null'
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },
  })
}

module.exports = configs;
