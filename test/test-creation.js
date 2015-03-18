/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    helpers = require('yeoman-generator').test;


describe('hazdev-webapp generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('hazdev-webapp:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'package.json',
      'README.md',

      'gruntconfig/browserify.js',
      'gruntconfig/clean.js',
      'gruntconfig/compass.js',
      'gruntconfig/concurrent.js',
      'gruntconfig/config.js',
      'gruntconfig/connect.js',
      'gruntconfig/copy.js',
      'gruntconfig/cssmin.js',
      'gruntconfig/index.js',
      'gruntconfig/jshint.js',
      'gruntconfig/uglify.js',
      'gruntconfig/watch.js',

      '.gitattributes',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',

      'Gruntfile.js',

      'src/htdocs/_config.inc.php',
      'src/htdocs/css/index.scss',
      'src/htdocs/favicon.ico',
      'src/htdocs/index.php',
      'src/htdocs/js/index.js',

      'src/lib/pre-install',
      'src/lib/uninstall',

      'test/test.html',
      'test/js/test.js'
    ];

    helpers.mockPrompt(this.app, {
      'appName': 'test-app',
      'appDesc': 'A cool test app.',
      'appHasGit': true,
      'appRepo': 'https://github.com/emartinez-usgs/generator-hazdev-webapp.git'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
