/**
* ServiceGenerator class
*/
var ServiceGenerator = module.exports = (function () {

    /**
    * Module dependencies.
    */
    var fs = require('fs');
    var ejs = require('ejs');
    var colors = require('colors');

    /**
    * Constructor.
    */
    function ServiceGenerator() {
    }

    /**
    * Check if service directory exist or create it asynchronously.
    */
    ServiceGenerator.prototype.generateService = function (model) {
        var self = this;
        if (model) {
            self.checkIfServiceDirectoryExist(function () {
                var filePath = process.cwd() + '/services/' + model.name + 'Service.js';
                var templatePath = process.cwd() + '/lib/template/serviceTemplate.ejs';

                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));

                var output = model.name + ' service created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /**
    * Check if service directory exist or create it asynchronously.
    */
    ServiceGenerator.prototype.checkIfServiceDirectoryExist = function (next) {
        var path = './services';
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

    return ServiceGenerator;
})();