/**
* ModelGenerator class
*/
var ModelGenerator = module.exports = (function () {

    /**
    * Module dependencies.
    */
    var fs = require('fs');
    var ejs = require('ejs');
    var colors = require('colors');

    /**
    * Constructor.
    */
    function ModelGenerator() {
    }

    /**
    * Generate model with params.
    */
    ModelGenerator.prototype.generateModel = function (model) {
        var self = this;
        if (model) {
            self.writeModel(model);
        }
        else {
            console.log('no model found !')
        }
    };

    /**
    * Write model file.
    */
    ModelGenerator.prototype.writeModel = function (model) {
        var filePath = process.cwd() + '/models/' + model.name + '.js';
        var templatePath = process.cwd() + '/lib/template/model.ejs';
        var templateFile = fs.readFileSync(templatePath).toString();
        fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));
        var output = model.name + ' model created';
        console.log(output.cyan);
    };

    return ModelGenerator;
})();