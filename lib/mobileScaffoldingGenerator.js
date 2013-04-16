/**
* MobileScaffoldingGenerator class
*/
var MobileScaffoldingGenerator = module.exports = (function () {

    /**
    * Module dependencies.
    */
    var fs = require('fs');
    var ejs = require('ejs');

    /**
    * Constructor.
    */
    function MobileScaffoldingGenerator() {
    }

    /**
    * Generate jQuery mobile index view with model in params.
    * @param {model} - model object.
    */
    MobileScaffoldingGenerator.prototype.generateMobileIndexView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/index_mobile.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/mobile/index.ejs';
                var scaffoldingFields = [];
                var foreachTag = '<% ' + model.name + 's.forEach(function(' + model.name + '){ %>';
                var endForeachTag = '<% }); %>';

                var fieldsDom = '<li><a href="/' + model.name + '/details/<%- ' + model.name + '.id %>"><%- ' + model.name + '.' + model.properties[0].name + ' %></a></li>\n';
                scaffoldingFields.push(fieldsDom);

                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));
                templateFile = fs.readFileSync(filePath).toString().replace('#SCAFFOLDINGFIELDS#', scaffoldingFields.join(''));
                templateFile = templateFile.replace('#FOREACH#', foreachTag);
                templateFile = templateFile.replace('#ENDFOREACH#', endForeachTag);

                fs.writeFileSync(filePath, templateFile);
                var output = model.name + ' index mobile view created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }

    };

    /**
    * Generate jQuery mobile details view with model in params.
    * @param {model} - model object.
    */
    MobileScaffoldingGenerator.prototype.generateMobileDetailsView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/details_mobile.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/mobile/details.ejs';
                var scaffoldingFields = [];
                for (var i = 0; i < model.properties.length; i++) {
                    var dom =
					  '<label for="' + model.properties[i].name + '">' + model.properties[i].name + '</label>\n'
					 + '<div>\n'
					 + '		<%- ' + model.name + '.' + model.properties[i].name + ' %>\n'
					 + '</div>\n\n';
                    scaffoldingFields.push(dom);
                }
                var modelIdEJS = '<%- ' + model.name + '.id %>';
                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));
                templateFile = fs.readFileSync(filePath).toString().replace('#SCAFFOLDINGFIELDS#', scaffoldingFields.join(''));
                templateFile = templateFile.replace('#MODELID#', modelIdEJS);

                fs.writeFileSync(filePath, templateFile);
                var output = model.name + 'mobile details view created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /**
    * Generate mobile edit view file with model in params.
    * @param {model} - model object.
    */
    MobileScaffoldingGenerator.prototype.generateMobileCreateView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/create_mobile.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/mobile/create.ejs';
                var scaffoldingFields = [];

                for (var i = 0; i < model.properties.length; i++) {
                    var dom = '<label>' + model.properties[i].name + '</label>'
                              + '<div>\n  ' + self.renderInputByProperty(model.name, model.properties[i]) + '</div>\n\n';
                    scaffoldingFields.push(dom);
                }

                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));
                templateFile = fs.readFileSync(filePath).toString().replace('#SCAFFOLDINGFIELDS#', scaffoldingFields.join(''));

                fs.writeFileSync(filePath, templateFile);
                var output = model.name + ' mobile create view created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /**
    * Generate mobile edit view file with model in params.
    * @param {model} - model object.
    */
    MobileScaffoldingGenerator.prototype.generateMobileEditView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/edit_mobile.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/mobile/edit.ejs';
                var scaffoldingFields = [];
                var scaffoldingHidden;
                for (var i = 0; i < model.properties.length; i++) {
                    var dom = '<label>' + model.properties[i].name + '</label>'
                              + '<div>\n  ' + self.renderInputByProperty(model.name, model.properties[i]) + '</div>\n\n';
                    scaffoldingFields.push(dom);
                }
                scaffoldingHidden = '<input type="hidden" name="id" value="<%= ' + model.name + '.id %>" />';
                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));
                templateFile = fs.readFileSync(filePath).toString().replace('#SCAFFOLDINGFIELDS#', scaffoldingFields.join(''));
                templateFile = templateFile.replace('#SCAFFOLDINGHIDDEN#', scaffoldingHidden);

                fs.writeFileSync(filePath, templateFile);
                var output = model.name + ' edit view created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /**
    * Generate mobile delete view file with model in params.
    * @param {model} - model object.
    */
    MobileScaffoldingGenerator.prototype.generateMobileDeleteView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/delete_mobile.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/mobile/delete.ejs';
                var scaffoldingFields = [];
                for (var i = 0; i < model.properties.length; i++) {
                    var dom =
					  '<label for="' + model.properties[i].name + '">' + model.properties[i].name + '</label>\n'
					 + '<div>\n'
					 + '		<%- ' + model.name + '.' + model.properties[i].name + ' %>\n'
					 + '</div>\n\n';
                    scaffoldingFields.push(dom);
                }
                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));
                templateFile = fs.readFileSync(filePath).toString().replace('#SCAFFOLDINGFIELDS#', scaffoldingFields.join(''));

                fs.writeFileSync(filePath, templateFile);
                var output = model.name + ' mobile delete view created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /**
    * render html tag input by property.
    */
    MobileScaffoldingGenerator.prototype.renderInputByProperty = function (modelname, property) {
        var input;
        switch (property.type) {
            case 'STRING':
                input = '<input type="text" id="' + property.name + '" name="' + property.name + '" value="<%= ' + modelname + '.' + property.name + ' %>"/>\n';
                break;
            case 'PASSWORD':
                input = '<input type="password" id="' + property.name + '" name="' + property.name + '" value="<%= ' + modelname + '.' + property.name + ' %>"/>\n';
                break;
            case 'TEXT':
                input = '<textarea id="' + property.name + '" name="' + property.name + '"><%= ' + modelname + '.' + property.name + ' %></textarea>\n';
                break;
            case 'INTEGER':
                input = '<input type="number" id="' + property.name + '" name="' + property.name + '" value="<%= ' + modelname + '.' + property.name + ' %>"/>\n';
                break;
            case 'DATE':
                input = '<input type="date" id="' + property.name + '" name="' + property.name + '" value="<%= ' + modelname + '.' + property.name + ' %>"/>\n';
                break;
            case 'BOOLEAN':
                input = '<input type="checkbox" id="' + property.name + '" name="' + property.name + '" checked="<%= ' + modelname + '.' + property.name + ' %>" />\n';
                break;
            case 'FLOAT':
                input = '<input type="number" id="' + property.name + '" name="' + property.name + '" value="<%= ' + modelname + '.' + property.name + ' %>"/>\n';
                break;
        }

        return input;
    };

    /**
    * Check if model directory exist or create it asynchronously.
    */
    MobileScaffoldingGenerator.prototype.createViewsDirectory = function (dirname, next) {
        fs.exists('/views/' + dirname, function (exists) {
            if (exists) {
                fs.fstat(function (err, stats) {
                    if (!err && stats.isDirectory()) {
                        next();
                    }
                    else {
                        fs.mkdir('/views/' + dirname, 0777, function () {
                            next();
                        });
                    }
                });
            }
            else {
                fs.mkdir('views/' + dirname, 0777, function () {
                    next();
                });
            }
        });
    };

    return MobileScaffoldingGenerator;
})();