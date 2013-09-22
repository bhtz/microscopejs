/**
 * module dependencies
 */
var Utils                = require('./utils');
var colors               = require('colors');
var ModelGenerator       = require('./generators/modelGenerator');
var ControllerGenerator  = require('./generators/controllerGenerator');
var DALScaffolder        = require('./scaffolders/dalScaffolder');
var ControllerScaffolder = require('./scaffolders/controllerScaffolder');
var ApiScaffolder        = require('./scaffolders/apiScaffolder');
var ViewsScaffolder      = require('./scaffolders/viewsScaffolder');

/**
 * microscope generator class
 */
(function(){

	/**
	* Constructor.
	*/
	function MicroscopeGenerator(){

	};

	/**
	 * generate microscope project
	 */
	MicroscopeGenerator.prototype.generateProject = function(projectName) {
		var source = __dirname + '/../templates/project/';
		var destination = process.cwd() + '/'+ projectName;

		var utils = new Utils();
		utils.copyTemplate(source, destination, function(){
			console.log('\nmicroscope project initialized'.green);
			console.log('cd project && npm install'.cyan);
			console.log('edit ./configs/database.json\n'.yellow);
		});
	};

	/**
	* run application server.
	*/
	MicroscopeGenerator.prototype.runServer = function() {
		var binPath = process.cwd() + '/app';
		require(binPath);
	};

	/**
	 * scaffold crud controller
	 * @param {[type]}  model
	 * @param {Boolean} isMobileViews
	 */
	MicroscopeGenerator.prototype.scaffoldCrudController = function(model, isMobileViews) {
		var controllerScaffolder = new ControllerScaffolder();
		controllerScaffolder.generate(model);

		var dalScaffolder = new DALScaffolder();
		dalScaffolder.generate(model);

		var modelGenerator = new ModelGenerator();
		modelGenerator.generate(model);

		var viewsScaffolder = new ViewsScaffolder();
		viewsScaffolder.generateCrud(model);

		if(isMobileViews){
			viewsScaffolder.generateMobileCrud(model);					
		}
	};

	/**
	 * scaffold rest api
	 * @param  {[type]} model
	 */
	MicroscopeGenerator.prototype.scaffoldRestApi = function(model) {
		var modelGenerator = new ModelGenerator();
		modelGenerator.generate(model);

		var apiScaffolder = new ApiScaffolder();
		apiScaffolder.generate(model);

		var dalScaffolder = new DALScaffolder();
		dalScaffolder.generate(model);
	};

	/**
	 * generate data access layer
	 * @param  {[type]} model
	 */
	MicroscopeGenerator.prototype.scaffoldDal = function(model) {
		var modelGenerator = new ModelGenerator();
		modelGenerator.generate(model);

		var dalScaffolder = new DALScaffolder();
		dalScaffolder.generate(model);
	};

	/**
	 * generate model file
	 * @param  {[type]} model
	 */
	MicroscopeGenerator.prototype.generateModel = function(model) {
		var modelGenerator = new ModelGenerator();
		modelGenerator.generate(model);
	};

	/**
	 * generate controller file and views
	 * @param  {[type]} controller
	 */
	MicroscopeGenerator.prototype.generateController = function(controller) {
		var controllerGenerator = new ControllerGenerator();
		controllerGenerator.generate(controller);
	};

	/**
	 * Check validity of property type.
	 * @param  {String}  type
	 */
	MicroscopeGenerator.prototype.isModelPropertyValid = function(type) {
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

	module.exports = MicroscopeGenerator;
})();