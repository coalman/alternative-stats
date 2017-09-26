var path = require('path');

var webpackCfg = require('./webpack.config');

module.exports = function (config) {
  config.set({
    files: [{
      pattern: 'test/index.js',
      watched: false
    }],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      context: webpackCfg.context,
      cache: webpackCfg.cache,

      resolve: webpackCfg.resolve,
      module: webpackCfg.module
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    frameworks: ['mocha'],
    reporters: ['mocha'],
    //browsers: ['Chrome'],
    browsers: ['ChromeHeadless'],

    client: {
      mocha: {
        reporter: 'html'
      }
    },

    mochaReporter: {
      output: 'autowatch',
      showDiff: true,
      divider: '-'
    }
  });
};
