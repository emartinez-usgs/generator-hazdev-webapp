/*global describe, beforeEach, it*/
'use strict';

var path		= require('path');
var helpers = require('yeoman-generator').test;


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
			'bower.json',
			'test-app.sublime-project',
			'.bowerrc',
			'.editorconfig',
			'.gitattributes',
			'.gitignore',
			'.jshintrc',
			'Gruntfile.js',
			'src/htdocs/index.html'
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
