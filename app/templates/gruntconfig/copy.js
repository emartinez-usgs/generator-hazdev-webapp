'use strict';

var config = require('./config');

var copy = {
  build: {
    cwd: config.src,
    dest: config.build + '/' + config.src,
    expand: true,
    src: [
      '**/*',
      '!**/*.scss',
      '!**/*.js'
    ]
  },

  dist: {
    cwd: config.build + '/' + config.src,
    dest: config.dist,
    expand: true,
    src: [
      'conf/config.inc.php',
      'conf/config.ini',

      'htdocs/css/images/**/*',
      'htdocs/images/**/*',
      'htdocs/*.html',
      'htdocs/*.php',

      'lib/**/*'
    ]
  }
};

module.exports = copy;
