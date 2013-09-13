/**
 * Modules dependencies
 */
var fs     = require('fs-extra');
var ejs    = require('ejs');
var colors = require('colors');

/**
 * Utils class
 */
(function(){

	/**
	* Constructor.
	*/
	function Utils(){};

	/**
	 * writeFile method - compile and write file.
	 * @param  {[type]} file destination
	 * @param  {[type]} template source path
	 * @param  {[type]} model
	 */
	Utils.prototype.writeFileSync = function(destinationFile, templatePath, model) {
        var templateFile = fs.readFileSync(templatePath).toString();
        fs.writeFileSync(destinationFile, ejs.render(templateFile, { 'model': model }));
	};

	/**
	 * write template file with custom ejs delimiter.
	 * @param  {String} file destination
	 * @param  {String} template source path
	 * @param  {Object} model
	 * @param  {String} ejsOpenTag
	 * @param  {String} ejsCloseTag
	 */
	Utils.prototype.writeTemplateFileSync = function(destinationFile, templatePath, model, ejsOpenTag, ejsCloseTag) {
		ejs.open = '{{';
		ejs.close = '}}';
		this.writeFileSync(destinationFile, templatePath, model);
	};

	/**
	 * copy template
	 * @param  {[type]}   template source
	 * @param  {[type]}   destination
	 * @param  {Function} callback
	 */
	Utils.prototype.copyTemplate = function(source, destination, callback) {
		fs.copy(source, destination, function(err){
			if (err){
				console.log('\n You have to run this command at the root of your microscope application \n'.red);
			}
			else{
				callback();
			}
		});
	};

	/**
	 * check if file exist and callback.
	 * @param  {[type]}   path
	 * @param  {Function} callback
	 */
	Utils.prototype.checkIfFileExist = function(path, callback) {
		fs.exists(path, function (exists) {
			if(exists){
				callback(true);
			}
			else{
				callback(false);
			}
		});
	};

	/*
    * check if controller directory exist or create it asynchronously
    */
    Utils.prototype.createDirectoryIfNotExist = function (name, destination, next) {
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

	module.exports = Utils;
})();