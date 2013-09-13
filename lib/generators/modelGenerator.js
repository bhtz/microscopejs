/**
* Module dependencies.
*/
var colors = require('colors');
var Utils = require('../utils');

/**
 * ModelGenerator class.
 */
(function(){

	var utils = new Utils();
	var templatePath = __dirname + '/../../templates/generators/modelTemplate.ejs';

	/**
	* Constructor.
	*/
	function ModelGenerator(){};

	/**
	 * write model file from model object and module path.
	 * @param  {model} model
	 * @param  {String]} modulePath
	 */
	ModelGenerator.prototype.generate = function(model) {
		var destinationFile = process.cwd() + '/app/models/' + model.name + '.js';
		utils.writeFileSync(destinationFile, templatePath, model);
		var output = model.name + ' model created';
		console.log(output.green);
	};

	module.exports = ModelGenerator;
})();