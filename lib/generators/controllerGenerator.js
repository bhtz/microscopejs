/**
* Module dependencies.
*/
var fs = require('fs');
var colors = require('colors');
var Utils = require('../utils');

/**
 * ControllerGenerator class
 */
(function(){

	var utils = new Utils();
	var templatePath = __dirname + '/../../templates/generators/controllerTemplate.ejs';

	/**
	* Constructor.
	*/
	function ControllerGenerator(){};

	/**
	* Generate empty controller with actions, views and stylus file from controller model.
	*/
	ControllerGenerator.prototype.generate = function(controllerModel) {
		var destinationFile = process.cwd() + '/app/controllers/' + controllerModel.name.toLowerCase() + 'Controller.js';
        
        utils.writeFileSync(destinationFile, templatePath, controllerModel);
        var output = controllerModel.name + ' controller created';
        console.log(output.green);

        utils.createDirectoryIfNotExist(controllerModel.name, process.cwd() + '/app/views/', function(){
			for (var i = 0; i < controllerModel.actions.length; i++) {
        		var viewPath = process.cwd() + '/app/views/' + controllerModel.name + '/' + controllerModel.actions[i] + '.ejs';
        		var templatePath = __dirname + '/../../templates/scaffolding/views/empty.ejs';
        		utils.writeFileSync(viewPath, templatePath, controllerModel.actions[i]);
        		var output = controllerModel.actions[i] + ' views created';
        		console.log(output.green);
        	};

			// generate styl file for this controller.
			fs.writeFileSync(process.cwd() + '/public/content/styles/'+ controllerModel.name.toLowerCase() + '.styl', "");
			console.log(controllerModel.name + '.styl created'.green);
        });
	};

	module.exports = ControllerGenerator;
})();