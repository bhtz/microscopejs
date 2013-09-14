#!/usr/bin/env node
var CommandLineInterface = require(__dirname +'/../lib/commandLineInterface');
var commandLineInterface = new CommandLineInterface();
commandLineInterface.display_microscope_form();