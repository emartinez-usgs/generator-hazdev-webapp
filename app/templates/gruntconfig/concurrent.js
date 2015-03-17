'use strict';

var concurrent = {
  build: [
    'browserify:index',
    'copy:build',
    'compass:build'
  ],

  dist: [
    'copy:dist',
    'uglify',
    'cssmin'
  ]
};

module.exports = concurrent;
