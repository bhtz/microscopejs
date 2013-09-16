/**
 * Module dependencies
 */
var fs                   = require('fs');
var inquirer             = require('inquirer');
var colors               = require('colors');
var Utils                = require('./utils');
var ModelGenerator       = require('./generators/modelGenerator');
var ControllerGenerator  = require('./generators/controllerGenerator');
var DALScaffolder        = require('./scaffolders/dalScaffolder');
var ControllerScaffolder = require('./scaffolders/controllerScaffolder');
var ApiScaffolder        = require('./scaffolders/apiScaffolder');
var ViewsScaffolder      = require('./scaffolders/viewsScaffolder');

/**
* microscope CLI class
*/
(function () {
	"use strict";

	/**
	* CommandLineInterface constructor.
	*/
	function CommandLineInterface(){
		colors.setTheme({
			primary: 'blue',
			warning: 'yellow',
			danger: 'red',
			info: 'cyan',
			success : 'green',
			default : 'grey'
		});
	};

	/**
	 * Display microscope CLI form.
	 */
	CommandLineInterface.prototype.display_microscope_form = function() {
		this.display_logo();
		var self = this;
		inquirer.prompt([{
			type: "list",
			name: "task",
			message: "What would you like to do ?",
			choices: [
				"run server",
				"new project",
				"generate",
				"scaffold",
				"database",
				"exit"
			]}
		], function(answer){
			self.microscope_form_callback(answer);
		});
	};

	/**
	 * display generate form
	 */
	CommandLineInterface.prototype.display_generate_form = function() {
		var self = this;
		inquirer.prompt([{
			type: "list",
			name: "generator",
			message: "what do you want to generate ?",
			choices: ["model","controller","exit"]
		}],
		function(answer){
			self.generate_form_callback(answer);
		});
	};

	/**
	 * display scaffold form
	 */
	CommandLineInterface.prototype.display_scaffold_form = function() {
		var self = this;
		inquirer.prompt([
		{
			type: "list",
			name: "scaffold",
			message: "what do you want to scaffold ?",
			choices: ['crud controller','rest api', 'DAL', 'exit']
		},
		{type: "input", name: "model", message: "Describe model here : ?"}],
		function(answers){
			self.scaffold_form_callback(answers);
		});
	};

	/**
	 * display databse form
	 */
	CommandLineInterface.prototype.display_database_form = function() {
		var self = this;
		inquirer.prompt([{
			type: "list",
			name: "database",
			message: "what do you want to do with your database ?",
			choices: ['synchronize', 'run fixtures', 'drop', 'exit']
		}],
		function(answer){
			self.database_form_callback(answer);
		});
	};

	/**
	 * microscope form callback.
	 * @param  {Array} answer
	 */
	CommandLineInterface.prototype.microscope_form_callback = function(answer) {
		switch(answer.task){
			case "run server":
				this.run_server();
				break;
			case "new project":
				this.display_project_form();
				break;
			case "generate":
				this.display_generate_form();
				break;
			case "scaffold":
				this.display_scaffold_form();
				break;
			case "database":
				this.display_database_form();
				break;
			default:
				return null;
		}
	};

	/**
	 * generate form callback
	 * @param  {Array} answer
	 */
	CommandLineInterface.prototype.generate_form_callback = function(answer) {
		switch(answer.generator){
			case "controller":
				this.generate_controller();
				break;
			case "model":
				this.generate_model();
				break;
			default:
				return null;
		}
	};

	/**
	 * database form callback
	 * @param  {Object} answer
	 */
	CommandLineInterface.prototype.database_form_callback = function(answer) {
		var DbManager = require(process.cwd()+'/db/dbManager');
		var dbManager = new DbManager();

		switch(answer.database){
			case "synchronize":
				console.log('\n... database synchronization ...\n'.info);
				dbManager.synchronize();
				break;
			case "run fixtures":
				dbManager.runFixtures();
				break;
			case "drop":
				console.log('\n... dropping database ...\n'.danger);
				dbManager.drop();
				break;
			default:
				return null;
		}
	};

	/**
	 * scaffold form callback
	 * @param  {Object} answer
	 */
	CommandLineInterface.prototype.scaffold_form_callback = function(answers) {
		var model = this.parse_model(answers.model);
		switch(answers.scaffold){
			case "crud controller":
				this.scaffold_crud_controller(model);
				break;
			case "rest api":
				this.scaffold_rest_api(model);
				break;
			case "DAL":
				var dalScaffolder = new DALScaffolder();
				dalScaffolder.generate(model);
				break;
			default:
				return null;
		}
	};

	/**
	 * run microscope application server.
	 */
	CommandLineInterface.prototype.run_server = function() {
		var binPath = process.cwd() + '/app';
		require(binPath);
	};

	/**
	 * generate a controller
	 * @param  {String} controllerName
	 */
	CommandLineInterface.prototype.generate_controller = function() {
		var self = this;
		var controllerGenerator = new ControllerGenerator();

		console.log('\nexample : controllerName actionName actionName2\n'.info);
		inquirer.prompt(
			{type: "input", name: "controller", message: "Describe controller here name ?"},
			function(answers){
				var controller = self.parse_controller(answers.controller);
				controllerGenerator.generate(controller);
		});
	};

	/**
	 * scaffold crud controller with DAL and views.
	 * @param  {Object} model
	 */
	CommandLineInterface.prototype.scaffold_crud_controller = function(model) {
		inquirer.prompt(
			{type: "confirm", name: "mobile", message: "Would you like mobile views too ?"},
			function(answer){
				var controllerScaffolder = new ControllerScaffolder();
				controllerScaffolder.generate(model);

				var dalScaffolder = new DALScaffolder();
				dalScaffolder.generate(model);

				var modelGenerator = new ModelGenerator();
				modelGenerator.generate(model);

				var viewsScaffolder = new ViewsScaffolder();
				viewsScaffolder.generateCrud(model);

				if(answer.mobile){
					viewsScaffolder.generateMobileCrud(model);					
				}

				var output = '\ncrud views generation completed for ' + model.name;
				console.log(output.info);
		});
	};

	/**
	 * scaffold rest api with DAL.
	 * @param  {Object} model
	 */
	CommandLineInterface.prototype.scaffold_rest_api = function(model) {
		var apiScaffolder = new ApiScaffolder();
		apiScaffolder.generate(model);

		var dalScaffolder = new DALScaffolder();
		dalScaffolder.generate(model);
	};

	/**
	 * generate a model
	 */
	CommandLineInterface.prototype.generate_model = function() {
		var self = this;
		var modelGenerator = new ModelGenerator();
		console.log('\n example : modelname propertyName:string propertyName2:text ... \n'.info);
		inquirer.prompt(
			{type: "input", name: "model", message: "discribe your model :"},
			function(answers){
				var model = self.parse_model(answers.model);
				modelGenerator.generate(model);
			}
		);
	};

	/**
	 * display project generator form
	 */
	CommandLineInterface.prototype.display_project_form = function() {
		var self = this;
		var templatespath = __dirname + '/../templates/project/';
		inquirer.prompt(
			{type: "input", name: "project", message: "What is your project name ?"}, function(answer){
				var commandDir = process.cwd() + '/'+ answer.project;
				self.initialize_project(templatespath, commandDir);
		});
	};

	/**
	 * Initialize microscope project.
	 * @param  {String} source path
	 * @param  {String} destination path
	 */
	CommandLineInterface.prototype.initialize_project = function(source, destination) {
		var utils = new Utils();
		utils.copyTemplate(source, destination, function(){
			console.log('\nmicroscope project initialized'.success);
			console.log('cd project && npm install'.info);
			console.log('edit ./configs/database.json\n'.warning);
		});
	};

	/**
	 * parse_model from string.
	 * @param  {String} model_str
	 * @return {[type]}
	 */
	CommandLineInterface.prototype.parse_model = function(model_str) {
		var parts = model_str.split(' ');
		var model = {name : parts[0], properties : []};
		var isValidateModel = true;

	    for (var i = 1; i < parts.length; i++) {
	        var property = parts[i].split(':');
	        var name = property[0];
	        var type = property[1].toUpperCase();

	        if (this.isModelPropertyValid(type)) {
	            model.properties.push({ name: name, type: type });
	        }
	        else {
	            isValidateModel = false;
	            console.log('\nunknown type for property : '.danger + name);
	        }
	    }

	    if (isValidateModel) {
	        return model;
	    } else {
	        return null;
	    }
	};

	/**
	 * parse controller from string
	 * @param  {String} controller_str
	 */
	CommandLineInterface.prototype.parse_controller = function(controller_str) {
		var parts = controller_str.split(' ');
		var controller = {name : parts[0], actions : []};
		for (var i = 1; i < parts.length; i++) {
			controller.actions.push(parts[i]);
		};
		return controller;
	};

	/**
	 * display microscopejs logo
	 */
	CommandLineInterface.prototype.display_logo = function() {
		console.log("\n");
		console.log('................~~~~~~~~~~~:............\n..............~~~~~~~~~~~~~~~...........\n............:~~~~~~~~~~~~~~~~~~.........\n...........:~~~~~~~~~~|~~~~~~~~~........\n.........~~~~~~~~~~~~77~~~~~~~~~........\n......~~~~~~~~~~~~~~7=~~~~~~~~~~,.......\n......~~~~~~~~~~~~~~777~~~~~~~~~~~~.....\n.....~~~~~~~~~~~~~7=~7~~~~~~~~~~~~~~~~..\n..~~~~~~~~~~~~~~~~~7~?7~~~~~~~~~~~~~~~~.\n.~~~~~~~~~~~~~~~~~77~7I~~~~~~~~~~~~~~~~.\n~~~~~~~~~~~~~~~~~I7=77~~~~~~~~~~~~~~~~~:\n~~~~~~~~~~~~~~~=    77 7~~~~~~~~~~~~~~~.\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~..\n.,~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~...\n.....~~~~~~~~~~~~~~~~~~~~~~~~~~~~.......\n........... microscope.js ..............\n'.info);
	};

	/**
	 * Check validity of property type.
	 * @param  {String}  type
	 */
	CommandLineInterface.prototype.isModelPropertyValid = function(type) {
		var validateType = ['STRING', 'TEXT', 'DATE', 'BOOLEAN', 'INTEGER', 'FLOAT'];
	    if (validateType.contains(type.toUpperCase())) {
	        return true;
	    } else {
	        return false;
	    }
	};

	/*
	* Extend JavaScript Array prototype.
	*/
	Array.prototype.contains = function (obj) {
		var i = this.length;
		while (i--) {
		    if (this[i] === obj) {
		        return true;
		    }
		}
		return false;
	}

	module.exports = CommandLineInterface;
})();