const slsw = require('serverless-webpack');
const packageInfo = require('./package.json');

const trimVersion = (version) => version.match(/[0-9]*\.[0-9]*/)[0];
const targetNode = 'node' + trimVersion(packageInfo.engines.node);
console.log(`-- target: ${targetNode}`);

module.exports = {
  context: __dirname,
  // entry: set by the plugin
  entry: slsw.lib.entries,
  // output: set by the plugin
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  target: targetNode,
  optimization: {
    // turns off code minimization (uglification).
    // Obfuscation makes it harder to read stack traces, reduces bundle size a bit
    // (but not enough to justify doing it for a server application),
    // and isn't really needed where code isn't distributed directly to users
    // (like over the web).
    minimize: false,
  },
  devtool: 'inline-source-map',
  module: {},
};

// webpack config reference:
// https://webpack.js.org/configuration/
