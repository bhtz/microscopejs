/**
 * Modules dependencies
 */
var assert = require("assert");
var CommandLineTool = require('../lib/commandLineTool');

/**
 * commandLineTool - Test.
 */
describe('commandLineToolTest', function(){

  var commandLineTool = null;

  /**
   * Instanciate CommandLineInterface before test
   */
  beforeEach(function(done){
      commandLineTool = new CommandLineTool();
      done();
  });
	

	/**
	 * parse controller test method
	 */
	describe('parse_controller_test', function(){
      it('should parse string and return controller object', function(){
      		var controller_str = 'home index edit';
      		var controller = commandLineTool.parse_controller(controller_str);
      		assert.equal('home', controller.name);
      		assert.equal(2, controller.actions.length);
      		assert.equal('edit', controller.actions[1]);
    	});
	});

	/**
	 * parse model test
	 */
	describe('parse_model_test', function(){
		  it('should parse string and return model object', function(){
      		var model_str = 'article title:string content:text';
      		var model = commandLineTool.parse_model(model_str);
      		assert.equal('article', model.name);
      		assert.equal('STRING', model.properties[0].type);
      		assert.equal(2, model.properties.length);
    	});

    	it('should return null', function(){
      		var model_str = 'article title:wrongProperyType content:text';
      		var model = commandLineTool.parse_model(model_str);
      		assert.equal(null, model);
    	});
	});
})