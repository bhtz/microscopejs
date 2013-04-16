/**
* ScaffoldingGenerator class
*/
var ScaffoldingGenerator = module.exports = (function () {

    /**
    * Module dependencies.
    */
    var fs = require('fs');
    var ejs = require('ejs');

    /**
    * Constructor.
    */
    function ScaffoldingGenerator() {
    }

    /**
    * generate index view file with model in params.
    */
    ScaffoldingGenerator.prototype.generateIndexView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/index.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/index.ejs';
                var scaffoldingFields = [];
                var scaffoldingProperties = [];
                var modelId = '<%= ' + model.name + '.id' + '%>';
                var foreachTag = '<% ' + model.name + 's.forEach(function(' + model.name + '){ %>';
                var endForeachTag = '<% }); %>';
                var idDom = '<td><%= ' + model.name + '.id %></td>';
                scaffoldingFields.push(idDom);
                for (var i = 0; i < model.properties.length; i++) {
                    var propertiesDom = '<td>' + model.properties[i].name + '</td>\n';
                    scaffoldingProperties.push(propertiesDom);
                    var fieldsDom = '<td><%- ' + model.name + '.' + model.properties[i].name + ' %></td>\n';
                    scaffoldingFields.push(fieldsDom);
                }
                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));
                templateFile = fs.readFileSync(filePath).toString().replace('#SCAFFOLDINGFIELDS#', scaffoldingFields.join(''));
                templateFile = templateFile.replace('#SCAFFOLDINGPROPERTIES#', scaffoldingProperties.join(''));
                templateFile = templateFile.replace('#FOREACH#', foreachTag);
                templateFile = templateFile.replace('#ENDFOREACH#', endForeachTag);
                templateFile = templateFile.replace('#MODELID#', modelId);
                templateFile = templateFile.replace('#MODELID#', modelId); //TODO each method here !

                fs.writeFileSync(filePath, templateFile);
                var output = model.name + ' index view created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /**
    * generate details view file with model in params.
    */
    ScaffoldingGenerator.prototype.generateDetailsView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/details.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/details.ejs';
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
                var output = model.name + ' details view created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /**
    * generate create view file with model in params.
    */
    ScaffoldingGenerator.prototype.generateCreateView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/create.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/create.ejs';
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
                var output = model.name + ' create view created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
    };

    /**
    * generate edit view file with model in params.
    */
    ScaffoldingGenerator.prototype.generateEditView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/edit.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/edit.ejs';
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
    * generate delete view file with model in params.
    */
    ScaffoldingGenerator.prototype.generateDeleteView = function (model) {
        var self = this;
        if (model) {
            self.createViewsDirectory(model.name, function () {
                var filePath = process.cwd() + '/views/' + model.name + '/delete.ejs';
                var templatePath = process.cwd() + '/lib/template/scaffolding/delete.ejs';
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
                var output = model.name + ' delete view created';
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
    ScaffoldingGenerator.prototype.renderInputByProperty = function (modelname, property) {
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
    ScaffoldingGenerator.prototype.createViewsDirectory = function (dirname, next) {
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

    return ScaffoldingGenerator;
})();