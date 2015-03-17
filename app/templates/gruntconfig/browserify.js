'use strict';

var config = require('./config');

var browerify = {
  options: {
    browserifyOptions: {
      debug: true,
      paths: [
        process.cwd() + '/' + config.src + '/htdocs/js'
      ]
    }
  },

  index: {
    src: [config.src + '/htdocs/js/index.js'],
    dest: config.build + '/' + config.src + '/htdocs/js/index.js'
  }
};

module.exports = browerify;
