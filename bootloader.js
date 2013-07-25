/**
* Routing class
*/
var Bootloader = module.exports = (function () {

	/**
	* Modules dependencies.
	*/
	var fs = require('fs');
	var path = require('path');

	/**
	* @param {app} - express app.
	*/
	function Bootloader(app) {
		this.LoadControllers(app);
		this.LoadApiControllers(app);
	}

	/**
	* Load all controllers.
	* @param {app}
	*/
	Bootloader.prototype.LoadControllers = function (app) {
		loadControllerFromFolder('./controllers/', app);
	};

	/**
	* Load all apiControllers.
	* @param {app}
	*/
	Bootloader.prototype.LoadApiControllers = function (app) {
		loadControllerFromFolder('./api/', app);
	};

	/**
	* Dynamically load controller from folder.
	*
	* @param {path} String - controllers folder path.
	* @param {app} express app.
	*/
	function loadControllerFromFolder(folderpath, app) {
		fs.readdir(folderpath, function (err, files) {
			if (err) { throw err; }
			files.forEach(function (file) {
				if (path.extname(file) === '.js') {
					var Controller = require(folderpath + file);
					var controller = new Controller(app);
				}
			});
		});
	};

	return Bootloader;
})();
