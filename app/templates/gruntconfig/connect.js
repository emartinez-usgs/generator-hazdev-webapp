'use strict';

var config = require('./config');

var iniConfig = require('ini').parse(require('fs')
    .readFileSync(config.src + '/conf/config.ini', 'utf-8'));

var dataProxyRewrite = {};
dataProxyRewrite['^' + iniConfig.MOUNT_PATH + '/data'] = '';

var rewrites = [
  {
    from: '^' + iniConfig.MOUNT_PATH + '/?(.*)$',
    to: '/$1'
  }
];

var addMiddleware = function (connect, options, middlewares) {
  middlewares.unshift(
    require('grunt-connect-proxy/lib/utils').proxyRequest,
    require('http-rewrite-middleware').getMiddleware(rewrites),
    require('gateway')(options.base[0], {
      '.php': 'php-cgi',
      'env': {
        'PHPRC': 'node_modules/hazdev-template/dist/conf/php.ini'
      }
    })
  );
  return middlewares;
};


var connect = {
  options: {
    hostname: '*'
  },

  proxies: [
    {
      context: '/theme/',
      host: 'localhost',
      port: config.templatePort,
      rewrite: {
        '^/theme': ''
      }
    },
    {
      context: iniConfig.MOUNT_PATH + '/data/pdf',
      host: 'localhost',
      port: config.dataPort,
      rewrite: dataProxyRewrite
    },
    {
      context: iniConfig.MOUNT_PATH + '/data/txt',
      host: 'localhost',
      port: config.dataPort,
      rewrite: dataProxyRewrite
    }
  ],


  build: {
    options: {
      base: [config.build + '/' + config.src + '/htdocs'],
      livereload: config.liveReloadPort,
      middleware: addMiddleware,
      open: 'http://localhost:' + config.buildPort + iniConfig.MOUNT_PATH +
          '/index.php',
      port: config.buildPort
    }
  },

  dist: {
    options: {
      base: [config.dist + '/htdocs'],
      middleware: addMiddleware,
      open: 'http://localhost:' + config.distPort + iniConfig.MOUNT_PATH +
          '/index.php',
      port: config.distPort
    }
  },

  test: {
    options: {
      base: [config.build + '/' + config.test],
      open: 'http://localhost:' + config.testPort + '/test.html',
      port: config.testPort
    }
  },


  template: {
    options: {
      base: ['node_modules/hazdev-template/dist/htdocs'],
      port: config.templatePort
    }
  }
};

module.exports = connect;
