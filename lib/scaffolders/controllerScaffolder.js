/**
 * module dependencies.
 */
var ejs             = require('ejs');
var Utils           = require('../utils');
var fs              = require('fs');
var colors          = require('colors');

/**
 * ControllerScaffolder class.
 */
(function(){

	/**
	 * attributes
	 */
	var stylesFolderPath = process.cwd() + '/stylus/';
	var controllerFolderPath = process.cwd() + '/app/controllers/';
	var controllerTemplatePath = __dirname + '/../../templates/scaffolding/controllers/controllerTemplate.ejs';

	var utils = new Utils();

	/**
	* Constructor.
	*/
	function ControllerScaffolder(){};

	/**
	 * generate controller file from model
	 * @param  {Object} model
	 */
	ControllerScaffolder.prototype.generate = function(model) {
		var destinationFile = controllerFolderPath + model.name + 'Controller.js';
		utils.writeFileSync(destinationFile, controllerTemplatePath, model);
		var output = model.name+'Controller created';
		console.log(output.green);

		// generate styl file for this controller.
		fs.writeFileSync(stylesFolderPath + model.name.toLowerCase() + '.styl', "");
		output = model.name + '.styl created';
		console.log(output.green);
	};

	module.exports = ControllerScaffolder;
})();