generator-hazdev-webapp
=======================

[![Build Status](https://secure.travis-ci.org/emartinez-usgs/generator-hazdev-webapp.png?branch=master)](https://travis-ci.org/emartinez-usgs/generator-hazdev-webapp)

A web application generator for Yeoman used by the USGS Earthquake Hazards
Program "HazDev" team.


Getting started
---------------

- Install dependencies:

        npm install -g yo generator-hazdev-webapp

- Create a project:

        mkdir project
        cd project
        yo hazdev-webapp

- Initialize your repository

        git init
        git add .gitignore
        git commit -m 'Set list of files to ignore.'
        git add --all
        git commit -m 'Initial project scaffolding.'



Road Map
--------

Here are the list of things to be done on this generator. They will probably
only be implemented as needed unless there is copious amounts of free time made
available.

1. Add support for optionally including Leaflet for generating application
   scaffolding that require interactive maps.
2. Update default set of tests in generate application to be more
   comprehensive.
3. Add testing coverage reports etc... for generated application.


License
-------

See: [LICENSE.md](LICENSE.md)
