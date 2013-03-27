var modelGenerator = module.exports = function () {

    var self = this;

    /*
    * Dependencies
    */
    var fs = require('fs');
    var ejs = require('ejs');
    var colors = require('colors');

    /*
    * Generate model with params
    */
    self.generateModel = function (model) {
        if (model) {
            self.writeModel(model);
        }
        else {
            console.log('no model found !')
        }
    };

    /*
    * Write model file
    */
    self.writeModel = function (model) {
        var filePath = process.cwd() + '/models/' + model.name + '.js';
        var templatePath = process.cwd() + '/lib/template/model.ejs';
        var templateFile = fs.readFileSync(templatePath).toString();
        fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));
        var output = model.name + ' model created';
        console.log(output.cyan);
    };

    return self;
}