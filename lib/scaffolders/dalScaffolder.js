/**
 * modules dependencies.
 */
var ejs = require('ejs');
var Utils = require('../utils');

/**
 * DataAccessLayerScaffolder class.
 */
(function(){

	var dalFolderPath = process.cwd() + '/app/dal/';
	var dalTemplatePath = __dirname + '/../../templates/scaffolding/dal/dalTemplate.ejs';
	var utils = new Utils();



	/**
	* Constructor.
	*/
	function DALScaffolder(){
		ejs.open = '<%';
		ejs.close = '%>';
	};

	/**
	 * Generate Data Access Layer for model.
	 * @param  {[type]} model
	 */
	DALScaffolder.prototype.generate = function(model) {
		var destinationFile = dalFolderPath + model.name + 'DAL.js';
		utils.writeFileSync(destinationFile, dalTemplatePath, model);
		var output = model.name+'DAL created';
		console.log(output.green);
	};

	module.exports = DALScaffolder;
})();