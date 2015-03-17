'use strict';

var gruntConfig = {

  browserify: require('./browserify'),
  concurrent: require('./concurrent'),
  clean: require('./clean'),
  compass: require('./compass'),
  connect: require('./connect'),
  copy: require('./copy'),
  cssmin: require('./cssmin'),
  jshint: require('./jshint'),
  uglify: require('./uglify'),
  watch: require('./watch'),

  tasks: [
    'grunt-browserify',
    'grunt-concurrent',
    'grunt-connect-proxy',
    'grunt-contrib-clean',
    'grunt-contrib-compass',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-cssmin',
    'grunt-contrib-jshint',
    'grunt-contrib-uglify',
    'grunt-contrib-watch'
  ]
};

module.exports = gruntConfig;
