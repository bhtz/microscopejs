var controllerGenerator = module.exports = function () {
    var self = this;

    /*
    * Dependencies
    */
    var fs = require('fs');
    var ejs = require('ejs');
    var colors = require('colors');

    /*
    * Create controller with model in params
    */
    self.generateController = function (model) {
        if (model) {
            self.createControllerDirectory(function () {
                var filePath = process.cwd() + '/controllers/' + model.name + 'Controller.js';
                var templatePath = process.cwd() + '/lib/template/controllers/controllerTemplate.ejs';

                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));

                var output = model.name + ' controller created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /*
    * check if controller directory exist or create it asynchronously
    */
    self.createControllerDirectory = function (next) {
		var path = './controllers';
        fs.exists(path, function (exists) {
            if (exists) {
                fs.lstat(path,function (err, stats) {
					if(!err){
						if (stats.isDirectory()) {
							next();
						}
						else {
							fs.mkdir(path, 0777, function () {
								next();
							});
						}
					}
					else{
						console.log(err.green);
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

    return self;
}