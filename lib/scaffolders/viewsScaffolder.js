/**
 * module dependencies.
 */
var ejs    = require('ejs');
var Utils  = require('../utils');
var colors = require('colors');

/**
 * ViewScaffolder class.
 */
(function(){


	var utils = new Utils();
	var viewsTemplateFolder = __dirname + '/../../templates/scaffolding/views/';
	var mobileViewsTemplateFolder = __dirname + '/../../templates/scaffolding/views/mobile/';
	var viewsFolder = process.cwd() + '/app/views/';
	var indexViewTemplate = viewsTemplateFolder + 'indexTemplate.ejs';

	/**
	* Constructor.
	*/
	function ViewScaffolder(){
		ejs.open = '{{';
		ejs.close = '}}';
	};

	/**
	 * generate index view file.
	 */
	ViewScaffolder.prototype.generateIndex = function(model) {
		this.generateViewFile(model, 'index', false);
	};

	/**
	 * generate create view file.
	 */
	ViewScaffolder.prototype.generateCreate = function(model) {
		this.generateViewFile(model, 'create', true);
	};

	/**
	 * generate details view file.
	 */
	ViewScaffolder.prototype.generateDetails = function(model) {
		this.generateViewFile(model, 'details', false);
	};

	/**
	 * generate edit view file.
	 */
	ViewScaffolder.prototype.generateEdit = function(model) {
		this.generateViewFile(model, 'edit', true);
	};

	/**
	 * generate delete view file.
	 */
	ViewScaffolder.prototype.generateDelete = function(model) {
		this.generateViewFile(model, 'delete', false);
	};

	/**
	 * generate index mobile view file.
	 */
	ViewScaffolder.prototype.generateMobileIndex = function(model) {
		this.generateMobileViewFile(model, 'index', false);
	};

	/**
	 * generate create mobile view file.
	 */
	ViewScaffolder.prototype.generateMobileCreate = function(model) {
		this.generateMobileViewFile(model, 'create', true);
	};

	/**
	 * generate details mobile view file.
	 */
	ViewScaffolder.prototype.generateMobileDetails = function(model) {
		this.generateMobileViewFile(model, 'details', false);
	};

	/**
	 * generate edit mobile view file.
	 */
	ViewScaffolder.prototype.generateMobileEdit = function(model) {
		this.generateMobileViewFile(model, 'edit', true);
	};

	/**
	 * generate delete mobile view file.
	 */
	ViewScaffolder.prototype.generateMobileDelete = function(model) {
		this.generateMobileViewFile(model, 'delete', false);
	};

	/**
	 * generate crud views files.
	 */
	ViewScaffolder.prototype.generateCrud = function(model) {
		var self = this;
		utils.createDirectoryIfNotExist(model.name, viewsFolder, function(){
			self.generateIndex(model);
			self.generateCreate(model);
			self.generateEdit(model);
			self.generateDetails(model);
			self.generateDelete(model);
		});
	};

	/**
	 * generate crud views files.
	 */
	ViewScaffolder.prototype.generateMobileCrud = function(model) {
		var self = this;
		utils.createDirectoryIfNotExist(model.name, viewsFolder, function(){
			self.generateMobileIndex(model);
			self.generateMobileCreate(model);
			self.generateMobileEdit(model);
			self.generateMobileDetails(model);
			self.generateMobileDelete(model);
		});
	};

	/**
	 * generate crud view file
	 * @param  {[type]}  model
	 * @param  {[type]}  name
	 * @param  {Boolean} isEditOrCreateView
	 */
	ViewScaffolder.prototype.generateViewFile = function(model, name, isEditOrCreateView) {
		var destinationFile = viewsFolder + model.name + '/' + name + '.ejs';
		var templatePath = viewsTemplateFolder + name +'Template.ejs';
		if(isEditOrCreateView){
			model.inputFields = this.getInputFieldsFromModel(model);
		}
		utils.writeFileSync(destinationFile, templatePath, model);
		var output = name + '.ejs view created';
		console.log(output.green);
	};

	/**
	 * generate crud mobile view file
	 * @param  {[type]}  model
	 * @param  {[type]}  name
	 * @param  {Boolean} isEditOrCreateView
	 */
	ViewScaffolder.prototype.generateMobileViewFile = function(model, name, isEditOrCreateView) {
		var destinationFile = viewsFolder + model.name + '/' + name + '_mobile.ejs';
		var templatePath = mobileViewsTemplateFolder + name +'Template.ejs';
		if(isEditOrCreateView){
			model.inputFields = this.getInputFieldsFromModel(model);
		}
		utils.writeFileSync(destinationFile, templatePath, model);
		var output = name + '_mobile.ejs mobile view created';
		console.log(output.green);
	};

	/**
	 * return input html fields from model
	 * @param  {[type]} model
	 * @return {Array}
	 */
	ViewScaffolder.prototype.getInputFieldsFromModel = function(model) {
		var inputFields = [];
		for (var i = 0; i < model.properties.length; i++) {
			var inputHTML = this.renderInputByProperty(model.name, model.properties[i]);
			inputFields.push(inputHTML);
		};
		return inputFields;
	};

	/**
	 * render html tag input by property.
	 * @param  {[type]} modelname
	 * @param  {[type]} property
	 * @return {String (html)} input
	 */
    ViewScaffolder.prototype.renderInputByProperty = function (modelname, property) {
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

	module.exports = ViewScaffolder;
})();