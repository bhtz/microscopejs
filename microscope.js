// dependency
// ==========================================

var program = require('commander');
var ejs = require('ejs');
var fs = require('fs');
var colors = require('colors');

var modelGenerator = require('./lib/modelGenerator')();
var scaffoldingGenerator = require('./lib/scaffoldingGenerator')();
var mobileScaffoldingGenerator = require('./lib/mobileScaffoldingGenerator')();
var controllerGenerator = require('./lib/controllerGenerator')();
var apiControllerGenerator = require('./lib/apiControllerGenerator')();
var serviceGenerator = require('./lib/serviceGenerator')();

// shell listener
// ==========================================

program
   .version('0.9.0')
   .option('-m, --mobile', 'add mobile views with jQuery mobile from model')
   .option('-a, --api', 'add restfull web API from model');

//
program.on('generate_model', function (args) {
    var model = getModel(args);
    modelGenerator.generateModel(model);
});

//
program.on('generate_controller', function (args) {
    var model = getModel(args);
    controllerGenerator.generateController(model);
    console.log("controller created".green);
});

//
program.on('generate_crud', function (args) {
    var model = getModel(args);

    modelGenerator.generateModel(model);
    scaffoldingGenerator.generateIndexView(model);
    scaffoldingGenerator.generateDetailsView(model);
    scaffoldingGenerator.generateCreateView(model);
    scaffoldingGenerator.generateEditView(model);
    scaffoldingGenerator.generateDeleteView(model);

    serviceGenerator.generateService(model);
    controllerGenerator.generateController(model);

    if (program.mobile) { 
        mobileScaffoldingGenerator.generateMobileIndexView(model);
        mobileScaffoldingGenerator.generateMobileDetailsView(model);
        mobileScaffoldingGenerator.generateMobileCreateView(model);
        mobileScaffoldingGenerator.generateMobileEditView(model);
        mobileScaffoldingGenerator.generateMobileDeleteView(model);
    }
    if (program.api) { apiControllerGenerator.generateApiController(model); }
});


// synchronize DbContext with database;
program.on('db_sync', function(){
    var dbContext = require('./models/dbContext')();
    dbContext.sync();
});

// drop database tables;
program.on('db_drop', function(){
    var dbContext = require('./models/dbContext')();
    dbContext.drop();
});


// microscope framework generators docs
program.on('docs', function () {
    console.log('\nUse microscope generators with following commands : \n'.yellow);
    console.log('(Type microscope.js --help for command options) \n'.yellow);
    var Table = require('cli-table');
    var table = new Table();
    table.push(
        ['generate_model'.cyan, 'Generate model class'],
        ['generate_controller'.cyan, 'Generate controller from model'],
        ['generate_crud'.cyan, 'Generate controller, service and views from model'],
        ['db_sync'.cyan, 'Synchronize database with your DbContext'],
        ['db_drop'.cyan, 'Drop your database']
    );

    console.log(table.toString());
});

// functions
// ==========================================

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function isValidProperty(property){
    var validateType = ['STRING', 'TEXT', 'DATE', 'BOOLEAN', 'INTEGER', 'FLOAT'];
    if(validateType.contains(property.type))
        return true;
    else
        return false;
};

function getModel(args){
    var model = { name: args[0], properties: [] };
    var isValidateModel = true;

	for (var i = 1; i < args.length; i++) {
		var property = args[i].split(':');
        var name = property[0];
        var type = property[1].toUpperCase();

        if(isValidProperty(property)){
            model.properties.push({ name: name, type: type });    
        }
		else{
            isValidateModel = false;
            console.log('\nunknown type for property : '.red + name);
        }
	}

    if(isValidateModel)
    {
        console.log('');
        return model;
    }else{
        return null;
    }
}

// execute
// ==========================================

program.parse(process.argv);
