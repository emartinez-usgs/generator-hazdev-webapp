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

			'src/conf/config.ini.orig',

			'src/htdocs/css/index.scss',
			'src/htdocs/index.html',
			'src/htdocs/js/index.js',
			'src/htdocs/js/mvc/Collection.js',
			'src/htdocs/js/mvc/Events.js',
			'src/htdocs/js/mvc/Model.js',
			'src/htdocs/js/mvc/Util.js',

			'src/lib/pre-install',
			'src/lib/uninstall',

			'test/index.html',
			'test/index.js',
			'test/spec/mvc/CollectionTest.js',
			'test/spec/mvc/EventsTest.js',
			'test/spec/mvc/ModelTest.js',
			'test/spec/mvc/UtilTest.js'
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
