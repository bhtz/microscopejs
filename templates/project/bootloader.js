/**
* Modules dependencies.
*/
var fs       = require('fs');
var path     = require('path');
var express  = require('express');
var url      = require('url');
var engine   = require('ejs-locals');

/**
* Application loader
*/
(function () {

	/**
	 * Constructor.
	 * @param {express} app.
	 */
	function Bootloader(app) {
		this.loadControllers(app);
		this.loadApiControllers(app);
	}

	/**
	 * load module controllers
	 * @param  {express} module
	 */
	Bootloader.prototype.loadControllers = function (app) {
		var controllerFolder =  __dirname + '/app/controllers/';
		loadControllerFromFolder(controllerFolder, app);
	};

	/**
	 * load module api controllers
	 * @param  {express} app
	 */
	Bootloader.prototype.loadApiControllers = function (app) {
		var apiFolder = __dirname + '/app/api/';
		loadControllerFromFolder(apiFolder, app);
	};

	/**
	 * Dynamically load controller from folder.
	 * @param  {String} folderpath
	 * @param  {express} app
	 */
	var loadControllerFromFolder = function(folderpath, app) {
		createDirectoryIfNotExist(folderpath, function(){
			fs.readdir(folderpath, function (err, files) {
				if (err) { throw err; }
				files.forEach(function (file) {
					if (path.extname(file) === '.js') {
						var Controller = require(folderpath + file);
						var controller = new Controller(app);
					}
				});
			});
		});
	};

	/*
    * check if directory exist or create it asynchronously
    */
    var createDirectoryIfNotExist = function (name, destination, next) {
        var path = destination + '/' + name.toLowerCase();
        fs.exists(path, function (exists) {
            if (exists) {
                fs.lstat(path, function (err, stats) {
                    if (!err) {
                        if (stats.isDirectory()) {
                            next();
                        }
                        else {
                            fs.mkdir(path, 0777, function () {
                                next();
                            });
                        }
                    }
                    else {
                        console.log(err.red);
                    }
                });
            }
            else {
                fs.mkdir(path, 0777, function () {
                    next();
                });
            }
        });
    };

	module.exports = Bootloader;
})();