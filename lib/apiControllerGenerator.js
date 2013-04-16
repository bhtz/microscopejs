/**
* ApiControllerGenerator class
*/
var ApiControllerGenerator = module.exports = (function () {

    /**
    * Module Dependencies.
    */
    var fs = require('fs');
    var ejs = require('ejs');
    var colors = require('colors');

    /**
    * Constructor.
    */
    function ApiControllerGenerator() {

    }

    /**
    * Create controller with model in params.
    * @param {model} - model object.
    */
    ApiControllerGenerator.prototype.generateApiController = function (model) {
        var self = this;
        if (model) {
            self.createApiControllerDirectory(function () {
                var filePath = process.cwd() + '/api/' + model.name + 'ApiController.js';
                var templatePath = process.cwd() + '/lib/template/controllers/apiControllerTemplate.ejs';

                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));

                var output = model.name + ' apiController created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /**
    * check if controller directory exist or create it asynchronously.
    * @param {next} - callback.
    */
    ApiControllerGenerator.prototype.createApiControllerDirectory = function (next) {
        var path = './api';
        fs.exists(path, function (exists) {
            if (exists) {
                fs.lstat(path, function (err, stats) {
                    if (!err) {
                        if (stats.isDirectory()) {
                            next();
                        }
                        else {
                            fs.mkdir('./controllers', 0777, function () {
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

    return ApiControllerGenerator;
})();