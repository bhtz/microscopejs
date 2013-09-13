/**
 * Modules dependencies
 */
var assert = require("assert");
var CommandLineInterface = require('../lib/commandLineInterface');

/**
 * commandLineInterface - Test.
 */
describe('commandLineInterfaceTest', function(){

  var commandLineInterface = null;

  /**
   * Instanciate CommandLineInterface before test
   * @type {CommandLineInterface}
   */
  beforeEach(function(done){
      commandLineInterface = new CommandLineInterface();  
      done();
  });
	

	/**
	 * parse controller test method
	 */
	describe('parse_controller_test', function(){
      it('should parse string and return controller object', function(){
      		var controller_str = 'home index edit';
      		var controller = commandLineInterface.parse_controller(controller_str);
      		assert.equal('home', controller.name);
      		assert.equal(2, controller.actions.length);
      		assert.equal('edit', controller.actions[1]);
    	});
	});

	/**
	 * parse model test
	 * @return {[type]} [description]
	 */
	describe('parse_model_test', function(){
		  it('should parse string and return model object', function(){
      		var model_str = 'article title:string content:text';
      		var model = commandLineInterface.parse_model(model_str);
      		assert.equal('article', model.name);
      		assert.equal('STRING', model.properties[0].type);
      		assert.equal(2, model.properties.length);
    	});

    	it('should return null', function(){
      		var model_str = 'article title:wrongProperyType content:text';
      		var model = commandLineInterface.parse_model(model_str);
      		assert.equal(null, model);
    	});
	});

	/**
	 * check model property validitation test
	 */
	describe('is_model_property_valid_test', function(){
      var fake_properties = ['STRING', 'text', 'DATE', 'BOOLEAN', 'INTEGER', 'FLOAT', 'TEST', 'OTHER'];
		  it('should validate property type', function(){
      		assert.equal(true, commandLineInterface.isModelPropertyValid(fake_properties[0]));
      		assert.equal(true, commandLineInterface.isModelPropertyValid(fake_properties[1]));
      		assert.equal(true, commandLineInterface.isModelPropertyValid(fake_properties[2]));
      		assert.equal(true, commandLineInterface.isModelPropertyValid(fake_properties[3]));
      		assert.equal(true, commandLineInterface.isModelPropertyValid(fake_properties[4]));
      		assert.equal(true, commandLineInterface.isModelPropertyValid(fake_properties[5]));
      		assert.equal(false, commandLineInterface.isModelPropertyValid(fake_properties[6]));
      		assert.equal(false, commandLineInterface.isModelPropertyValid(fake_properties[7]));
    	});
	});
})