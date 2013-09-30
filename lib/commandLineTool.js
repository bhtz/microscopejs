/**
 * Module dependencies
 */
var fs                   = require('fs');
var inquirer             = require('inquirer');
var colors               = require('colors');
var MicroscopeGenerator  = require('./microscopeGenerator');

/**
* microscope CommandLineTool with inquirer class.
*/
(function () {
	"use strict";

	var microscopeGenerator = new MicroscopeGenerator();

	/**
	* CommandLineTool constructor.
	*/
	function CommandLineTool(){
		colors.setTheme({
			primary: 'blue',
			warning: 'yellow',
			danger: 'red',
			info: 'cyan',
			success : 'green',
			default : 'grey'
		});
		this.display_microscope_form();
	};

	/**
	 * Display microscope CLI form.
	 */
	CommandLineTool.prototype.display_microscope_form = function() {
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
	CommandLineTool.prototype.display_generate_form = function() {
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
	CommandLineTool.prototype.display_scaffold_form = function() {
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
	CommandLineTool.prototype.display_database_form = function() {
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
	CommandLineTool.prototype.microscope_form_callback = function(answer) {
		switch(answer.task){
			case "run server":
				microscopeGenerator.runServer();
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
	CommandLineTool.prototype.generate_form_callback = function(answer) {
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
	CommandLineTool.prototype.database_form_callback = function(answer) {
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
	CommandLineTool.prototype.scaffold_form_callback = function(answers) {
		var model = this.parse_model(answers.model);
		switch(answers.scaffold){
			case "crud controller":
				this.scaffold_crud_controller(model);
				break;
			case "rest api":
				this.scaffold_rest_api(model);
				break;
			case "DAL":
				microscopeGenerator.scaffoldDal(model);
				break;
			default:
				return null;
		}
	};

	/**
	 * generate a controller
	 * @param  {String} controllerName
	 */
	CommandLineTool.prototype.generate_controller = function() {
		var self = this;

		console.log('\nexample : controllerName actionName actionName2\n'.info);
		inquirer.prompt(
			{type: "input", name: "controller", message: "Describe controller here name ?"},
			function(answers){
				var controller = self.parse_controller(answers.controller);
				microscopeGenerator.generateController(controller);
		});
	};

	/**
	 * scaffold crud controller with DAL and views.
	 * @param  {Object} model
	 */
	CommandLineTool.prototype.scaffold_crud_controller = function(model) {
		inquirer.prompt(
			{type: "confirm", name: "mobile", message: "Would you like mobile views too ?"},
			function(answer){

				microscopeGenerator.scaffoldCrudController(model, answer.mobile);

				var output = '\ncrud views generation completed for ' + model.name;
				console.log(output.info);
		});
	};

	/**
	 * scaffold rest api with DAL.
	 * @param  {Object} model
	 */
	CommandLineTool.prototype.scaffold_rest_api = function(model) {
		microscopeGenerator.scaffoldRestApi(model);
	};

	/**
	 * generate a model
	 */
	CommandLineTool.prototype.generate_model = function() {
		var self = this;
		console.log('\n example : modelname propertyName:string propertyName2:text ... \n'.info);
		inquirer.prompt(
			{type: "input", name: "model", message: "discribe your model :"},
			function(answers){
				var model = self.parse_model(answers.model);
				microscopeGenerator.generateModel(model);
			}
		);
	};

	/**
	 * display project generator form
	 */
	CommandLineTool.prototype.display_project_form = function() {
		var self = this;
		
		inquirer.prompt(
			{type: "input", name: "project", message: "What is your project name ?"}, function(answer){
				microscopeGenerator.generateProject(answer.project);
		});
	};

	/**
	 * parse_model from string.
	 * @param  {String} model_str
	 * @return {[type]}
	 */
	CommandLineTool.prototype.parse_model = function(model_str) {
		var parts = model_str.split(' ');
		var model = {name : parts[0], properties : []};
		var isValidateModel = true;

	    for (var i = 1; i < parts.length; i++) {
	        var property = parts[i].split(':');
	        var name = property[0];
	        var type = property[1].toUpperCase();

	        if (microscopeGenerator.isModelPropertyValid(type)) {
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
	CommandLineTool.prototype.parse_controller = function(controller_str) {	
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
	CommandLineTool.prototype.display_logo = function() {
		var logo = "        tt        \n      t    t      \n    ,, tttt ;.    \n   t tttttttt t   \n t ,tttttttttt: t \nt tttttttttttttt t\nt;ttt ttttttt tt;t\nt;tttt ttttt  tt;t\nt;ttttt tt tt tt;t\nt;tttttt  ttt tt;t\nt;ttttttttttt tt;t\nt;ttttttttttt tt;t\nt;ttttttttttt tt;t\nt;tttttttttttitt;t\nt tttttttttttitt t\n t :tttttttttt. t \n   t ttttttt; t   \n     t tttt t     \n      ,:  ;:      \n        tt        \n";
		console.log(logo.cyan);
	};

	module.exports = CommandLineTool;
})();