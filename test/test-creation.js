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
      '.gitattributes',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      'Gruntfile.js',
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
      'gruntconfig/mocha_phantomjs',
      'gruntconfig/uglify.js',
      'gruntconfig/watch.js',

      'src/htdocs/css/index.scss',
      'src/htdocs/js/index.js',
      'src/htdocs/_config.inc.php',
      'src/htdocs/_navigation.inc.php',
      'src/htdocs/favicon.ico',
      'src/htdocs/index.php',

      'src/lib/configure.php',
      'src/lib/install-funcs.inc.php',
      'src/lib/pre-install',
      'src/lib/pre-install.php',
      'src/lib/uninstall',

      'test/js/test.js'
      'test/test.html',
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
