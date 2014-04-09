#!/usr/bin/env node

/**
 * module dependencies
 */
var program             = require('commander');
var CommandLineTool     = require('./commandLineTool');
var MicroscopeGenerator = require('./microscopeGenerator');
var colors              = require('colors');

var microscopeGenerator = new MicroscopeGenerator();

program
  .version('0.14.0')
  .option('-m, --mobile', 'add mobile views (scaffold controller command)');

/**
 * display help.
 */
program.on('help', function () {
	console.log('\nmicroscope (0.14.0) commands : \n'.cyan);
	console.log('tool :'.cyan + ', display microscope inquirer tool'.green);
	console.log('new :'.cyan + ' generate new microscope project'.green);
	console.log('server :'.cyan + ' run microscope application server'.green);
	console.log('generate '.cyan + ' [controller, model] :'.yellow + ' generate files with options'.green);
	console.log('scaffold '.cyan + ' [controller, api, dal] :'.yellow + ' scaffold somethings with options'.green);
	console.log('db '.cyan + ' [sync, drop, fixture] :'.yellow + ' interact with database'.green);
});

/**
 * display command line tool.
 */
program.on('tool', function () {
	var commandLineTool = new CommandLineTool();
	commandLineTool.start();
});

/**
 * create new microscope project
 * @param  {[type]} args
 */
program.on('new', function (args) {
	var projectName = args[0];
	microscopeGenerator.generateProject(projectName);
});

/**
 * run application server.
 */
program.on('server', function () {
	microscopeGenerator.runServer();
});

/**
 * parse generate command.
 * @param  {[type]} args
 */
program.on('generate', function (args) {
	var target = args[0];
	if(target === 'controller'){
		var controllerArgs = args.slice(1);
		generateController(controllerArgs);
	}
	else if(target === 'model'){
		var modelArgs = args.slice(1);
		generateModel(modelArgs);
	}
	else{
		var output = '\nunknown command ' + target
		console.log(output.red);
	}
});

/**
 * parse scaffold command.
 * @param  {[type]} args
 */
program.on('scaffold', function (args) {
	var target = args[0];
	var modelArgs = args.slice(1);
	if(target === 'controller'){
		if(program.mobile){
			scaffoldController(modelArgs, true);
		}
		else{
			scaffoldController(modelArgs, false);
		}
	}
	else if(target === 'api'){
		scaffoldRestApi(modelArgs);
	}
	else if(target === 'dal'){
		scaffoldDal(modelArgs);
	}
	else{
		var output = '\nunknown command ' + target
		console.log(output.red);
	}
});

/**
 * parse db command
 * @param  {[type]} args
 */
program.on('db', function(args){
	var target = args[0];
	switch(target){
		case 'sync':
			databaseSynchronize();
			break;

		case 'drop':
			databaseDrop();
			break;

		case 'fixture':
			break;
		default:
			var output = '\nunknown command ' + target
			console.log(output.red);
	}
});

/**
 * parse and scaffold controller from args
 * @param  {[type]} args
 */
var scaffoldController = function(args, isMobileViews){
	var model = parseModel(args);
	if(model){
		microscopeGenerator.scaffoldCrudController(model, isMobileViews);	
	}
	else{
		console.log('model is not valid'.red);
	}
};

/**
 * parse and scaffold api from args
 * @param  {[type]} args
 */
var scaffoldRestApi = function(args){
	var model = parseModel(args);
	if(model){
		microscopeGenerator.scaffoldRestApi(model);
	}
	else{
		console.log('model is not valid'.red);
	}
};

/**
 * parse and scaffold dal from args
 * @param  {[type]} args
 */
var scaffoldDal = function(args){
	var model = parseModel(args);
	if(model){
		microscopeGenerator.scaffoldDal(model);
	}
	else{
		console.log('model is not valid'.red);
	}
};

/**
 * parse and generate controller from args
 * @param  {[type]} args
 */
var generateController = function(args){
	var controller = parseController(args);
	if(controller){
		microscopeGenerator.generateController(controller);
	}
	else{
		console.log('not valid arguments, there must be at least one action argument'.red);
	}
};

/**
 * parse and generate model from args
 * @param  {[type]} args
 */
var generateModel = function(args){
	var model = parseModel(args);
	if(model){
		microscopeGenerator.generateModel(model);
	}
	else{
		console.log('model is not valid'.red);
	}
};

/**
 * synchronize database.
 */
var databaseSynchronize = function(){
	var DbManager = require(process.cwd()+'/db/dbManager');
	var dbManager = new DbManager();
	dbManager.synchronize();
};

/**
 * drop database
 */
var databaseDrop = function(){
	var DbManager = require(process.cwd()+'/db/dbManager');
	var dbManager = new DbManager();
	dbManager.drop();
};

/**
 * run fixtures
 */
var databaseFixture = function(){
	var DbManager = require(process.cwd()+'/db/dbManager');
	var dbManager = new DbManager();
	dbManager.runFixtures();
};

/**
 * parse model from arguments.
 * @return {Object} model
 */
var parseModel = function(args){
	var model = { name: args[0], properties: [] };
    var isValidateModel = true;

    for (var i = 1; i < args.length; i++) {
        var property = args[i].split(':');
        var name = property[0];
        var type = property[1].toUpperCase();

        if (microscopeGenerator.isModelPropertyValid(type)) {
            model.properties.push({ name: name, type: type });
        }
        else {
            isValidateModel = false;
            console.log('\nunknown type for property : '.red + name);
        }
    }

    if (isValidateModel) {
        return model;
    } else {
        return null;
    }
};

/**
 * parse controller from arguments.
 * @return {Object} controller
 */
var parseController = function(args){
	if(args.length > 1){
		var controller = {name : args[0], actions : []};
		for (var i = 1; i < args.length; i++) {
			controller.actions.push(args[i]);
		};
		return controller;
	}
	else{
		return null;
	}
};

program.parse(process.argv);