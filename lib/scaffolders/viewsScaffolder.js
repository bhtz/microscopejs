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
	ViewScaffolder.prototype.generateShow = function(model) {
		this.generateViewFile(model, 'show', false);
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
	ViewScaffolder.prototype.generateMobileShow = function(model) {
		this.generateMobileViewFile(model, 'show', false);
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
			self.generateShow(model);
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
			self.generateMobileShow(model);
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
        var input = {html : null, name : property.name };
        switch (property.type) {
            case 'STRING':
                input.html = '<%- f.text_field("'+ property.name +'") %>';
                break;
            case 'PASSWORD':
                input.html = '<%-f.password_field("'+property.name+'") %>';
                break;
            case 'TEXT':
                input.html = '<%- f.text_area("'+property.name+'") %>';
                break;
            case 'INTEGER':
                input.html = '<%- f.number_field("'+property.name+'") %>';
                break;
            case 'DATE':
                input.html = '<%- f.date("'+property.name+'") %>';
                break;
            case 'BOOLEAN':
                input.html = '<%- f.select("'+property.name+'",[{"value":0,"text":"false"},{"value":1,"text":"true"}]) %>';
                break;
            case 'FLOAT':
                input.html = '<%- f.number_field("'+property.name+'") %>';
                break;
        }

        return input;
    };

	module.exports = ViewScaffolder;
})();