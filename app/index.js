'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');


var HazdevWebappGenerator = module.exports = function HazdevWebappGenerator (
    args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname,
      '../package.json')));
};

util.inherits(HazdevWebappGenerator, yeoman.generators.Base);

HazdevWebappGenerator.prototype.askFor = function askFor () {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);


  var prompts = [
    {
      name: 'appName',
      message: 'What is the name of this web application?',
      default: require('path').basename((require('process').cwd()))
    },
    {
      name: 'appDesc',
      message: 'Briefly describe this web application.',
      default: 'An awesome web app.'
    },
    {
      type: 'confirm',
      name: 'appHasGit',
      message: 'Will this application be in Git?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.appDesc = props.appDesc;
    this.appHasGit = props.appHasGit;

    cb();
  }.bind(this));
};

/**
 * More prompts based on first round of prompts.
 */
HazdevWebappGenerator.prototype.askForMore = function askForMore () {
  var prompts = [];

  // Only prompt for GitHub URL if user said this was on GitHub
  if (this.appHasGit) {
    prompts.push({
      name: 'appRepo',
      message: 'Application Git repository URL?',
      default: 'https://github.com/usgs/' + _.slugify(this.appName) + '.git'
    });
  } else {
    this.appRepoInfo = '';
  }

  if (prompts.length > 0) {
    var cb = this.async();
    this.prompt(prompts, function (props) {

      var appRepo = {
        type: 'git',
        url: '' + props.appRepo
      };
      this.appRepoInfo = "\n\t\"repository\": " +
          JSON.stringify(appRepo) + ',';

      cb();
    }.bind(this));
  }
};

HazdevWebappGenerator.prototype.directories = function directories () {
  this.mkdir('gruntconfig');

  this.mkdir('src');
  this.mkdir('src/htdocs');
  this.mkdir('src/conf');
  this.mkdir('src/lib');

  this.mkdir('test');
  this.mkdir('test/spec');
};

HazdevWebappGenerator.prototype.templatefiles = function templatefiles () {

  // Templates for project setup
  this.template('_package.json', 'package.json');
  this.template('_README.md', 'README.md');

};

HazdevWebappGenerator.prototype.staticfiles = function staticfiles () {
  // Files for project setup
  this.copy('gruntconfig/browserify.js', 'gruntconfig/browserify.js');
  this.copy('gruntconfig/clean.js', 'gruntconfig/clean.js');
  this.copy('gruntconfig/compass.js', 'gruntconfig/compass.js');
  this.copy('gruntconfig/concurrent.js', 'gruntconfig/concurrent.js');
  this.copy('gruntconfig/config.js', 'gruntconfig/config.js');
  this.copy('gruntconfig/connect.js', 'gruntconfig/connect.js');
  this.copy('gruntconfig/copy.js', 'gruntconfig/copy.js');
  this.copy('gruntconfig/cssmin.js', 'gruntconfig/cssmin.js');
  this.copy('gruntconfig/index.js', 'gruntconfig/index.js');
  this.copy('gruntconfig/jshint.js', 'gruntconfig/jshint.js');
  this.copy('gruntconfig/uglify.js', 'gruntconfig/uglify.js');
  this.copy('gruntconfig/watch.js', 'gruntconfig/watch.js');

  this.copy('gitattributes', '.gitattributes');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
  this.copy('travis.yml', '.travis.yml');
  this.copy('Gruntfile.js', 'Gruntfile.js');


  // Files for initial application skeleton
  this.copy('src/conf/config.inc.php', 'src/conf/config.inc.php');

  this.copy('src/htdocs/css/index.scss', 'src/htdocs/css/index.scss');
  this.copy('src/htdocs/favicon.ico', 'src/htdocs/favicon.ico');
  this.copy('src/htdocs/index.php', 'src/htdocs/index.php');
  this.copy('src/htdocs/js/index.js', 'src/htdocs/js/index.js');

  this.copy('src/lib/configure.php', 'src/lib/configure.php');
  this.copy('src/lib/install-funcs.inc.php','src/lib/install-funcs.inc.php');
  this.copy('src/lib/pre-install', 'src/lib/pre-install');
  this.copy('src/lib/pre-install.php','src/lib/pre-install.php');
  this.copy('src/lib/uninstall', 'src/lib/uninstall');


  // Files for testing
  this.copy('test/index.html', 'test/index.html');
  this.copy('test/index.js', 'test/index.js');
};
