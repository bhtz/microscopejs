/**
 * Modules dependencies
 */
var assert = require("assert");
var MicroscopeGenerator = require('../lib/microscopeGenerator');

describe('microscopeGeneratorTest', function(){

      var microscopeGenerator = null;

      /**
      * Instanciate CommandLineInterface before test
      */
      beforeEach(function(done){
            microscopeGenerator = new MicroscopeGenerator();
            done();
      });

      /**
      * check model property validitation test
      */
      describe('is_model_property_valid_test', function(){
            var fake_properties = ['STRING', 'text', 'DATE', 'BOOLEAN', 'INTEGER', 'FLOAT', 'TEST', 'OTHER'];
            it('should validate property type', function(){
                  assert.equal(true, microscopeGenerator.isModelPropertyValid(fake_properties[0]));
                  assert.equal(true, microscopeGenerator.isModelPropertyValid(fake_properties[1]));
                  assert.equal(true, microscopeGenerator.isModelPropertyValid(fake_properties[2]));
                  assert.equal(true, microscopeGenerator.isModelPropertyValid(fake_properties[3]));
                  assert.equal(true, microscopeGenerator.isModelPropertyValid(fake_properties[4]));
                  assert.equal(true, microscopeGenerator.isModelPropertyValid(fake_properties[5]));
                  assert.equal(false, microscopeGenerator.isModelPropertyValid(fake_properties[6]));
                  assert.equal(false, microscopeGenerator.isModelPropertyValid(fake_properties[7]));
            });
      });

});