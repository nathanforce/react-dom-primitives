/*eslint-disable no-var */
var path = require('path')
var packageInfo = require('./package.json')
var webpack = require('webpack')
var playgroundPath = path.join(__dirname, 'playground')
var srcPath = path.join(__dirname, 'src')
var DEBUG = false

var aliases = {}
aliases['../utils/createFunctionalComponent'] = path.resolve(__dirname) + '/src/utils/createFunctionalComponent.js'
aliases['../utils/createClassComponent'] = path.resolve(__dirname) + '/src/utils/createClassComponent.js'

var entryPoints = {}
function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
var tagList = require('./src/tagList')

/* Assign aliases, define externs, define entrypoints */
for (var i = 0; i < tagList.length; i++) {
  var primative = tagList[i]
  /* define entryPoints  */
  // entryPoints[primative] = ['./src/primatives/' + primative]
  entryPoints[capitalize(primative)] = ['./src/primatives/' + primative + '/' + primative + '.class.js']
}

var externals = ['../utils/createFunctionalComponent', '../utils/createClassComponent']
  .concat(Object.keys(packageInfo.peerDependencies))

module.exports = {
  target: 'web',
  entry: entryPoints,
  output: {
    path: path.resolve('lib'),
    filename: '[name]/[name].js',
    libraryTarget: 'commonjs2',
    library: packageInfo.name
  },
  resolve: {
    root: [
      path.resolve(__dirname)
    ],
    alias: aliases,
    extensions: ['', '.js', '.jsx']
  },
  externals: externals,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /(node_modules)/,
      }
    ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
    })
  ],
}
