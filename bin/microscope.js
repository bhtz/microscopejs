#!/usr/bin/env node

var path = require('path');
var fs   = require('fs');
var libPath  = path.join(path.dirname(fs.realpathSync(__filename)), '../lib');

var CommandLineInterface = require(libPath + '/commandLineInterface');