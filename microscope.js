// dependency
// ==========================================

var program = require('commander');
var ejs = require('ejs');
var fs = require('fs');
var colors = require('colors');

var ModelGenerator = require('./lib/modelGenerator');
var ScaffoldingGenerator = require('./lib/scaffoldingGenerator');
var MobileScaffoldingGenerator = require('./lib/mobileScaffoldingGenerator');
var ControllerGenerator = require('./lib/controllerGenerator');
var ApiControllerGenerator = require('./lib/apiControllerGenerator');
var ServiceGenerator = require('./lib/serviceGenerator');

// shell listener
// ==========================================

/*
* some comment here.
*/
program
   .version('0.9.0')
   .option('-m, --mobile', 'add mobile views with jQuery mobile from model')
   .option('-a, --api', 'add restfull web API from model')
   .option('-h, --help', 'use : node microscope.js docs');

/*
* some comment here.
*/
program.on('generate_model', function (args) {
    var model = getModel(args);
    var modelGenerator = new ModelGenerator();
    modelGenerator.generateModel(model);
});

/*
* Generate controller.
*/
program.on('generate_controller', function (args) {
    var model = getModel(args);
    var controllerGenerator = new ControllerGenerator();
    controllerGenerator.generateController(model);
    console.log("controller created".green);
});

/*
* Generate crud operations.
*/
program.on('generate_crud', function (args) {
    var model = getModel(args);

    var modelGenerator = new ModelGenerator();
    modelGenerator.generateModel(model);

    var scaffoldingGenerator = new ScaffoldingGenerator();
    scaffoldingGenerator.generateIndexView(model);
    scaffoldingGenerator.generateDetailsView(model);
    scaffoldingGenerator.generateCreateView(model);
    scaffoldingGenerator.generateEditView(model);
    scaffoldingGenerator.generateDeleteView(model);

    var serviceGenerator = new ServiceGenerator();
    serviceGenerator.generateService(model);

    var controllerGenerator = new ControllerGenerator();
    controllerGenerator.generateController(model);

    if (program.mobile) {
        var mobileScaffoldingGenerator = new MobileScaffoldingGenerator();
        mobileScaffoldingGenerator.generateMobileIndexView(model);
        mobileScaffoldingGenerator.generateMobileDetailsView(model);
        mobileScaffoldingGenerator.generateMobileCreateView(model);
        mobileScaffoldingGenerator.generateMobileEditView(model);
        mobileScaffoldingGenerator.generateMobileDeleteView(model);
    }
    if (program.api) {
        var apiControllerGenerator = new ApiControllerGenerator();
        apiControllerGenerator.generateApiController(model);
    }
});

/*
* Generate Restfull web api with model.
*/
program.on('generate_api', function (args) {
    var model = getModel(args);

    var modelGenerator = new ModelGenerator();
    var serviceGenerator = new ServiceGenerator();
    var apiControllerGenerator = new ApiControllerGenerator();

    modelGenerator.generateModel(model);
    serviceGenerator.generateService(model);
    apiControllerGenerator.generateApiController(model);
});

/*
* synchronize DbContext with database.
*/
program.on('db_sync', function () {
    var DbContext = require('./models/dbContext');
    var dbContext = new DbContext();
    dbContext.sync();
});

/*
* drop database tables.
*/
program.on('db_drop', function () {
    var DbContext = require('./models/dbContext');
    var dbContext = new DbContext();
    dbContext.drop();
});

/*
* microscope framework generators docs.
*/
program.on('docs', function () {
    console.log('(Type microscope.js --help for command options) \n'.yellow);
    outputDocs();
});

// functions
// ==========================================

function outputDocs() {
    console.log('\nUse microscope generators with following commands : \n'.yellow);
    var Table = require('cli-table');
    var table = new Table();
    table.push(
        ['microscope commands'.red, ''],
        ['generate_model'.cyan, 'Generate model class'],
        ['generate_controller'.cyan, 'Generate controller from model'],
        ['generate_crud'.cyan, 'Generate controller, service and views from model'],
        ['db_sync'.cyan, 'Synchronize database with your DbContext'],
        ['db_drop'.cyan, 'Drop your database']
    );

    var optionTable = new Table();
    optionTable.push(
        ['generate_crud options'.red, ''],
        ['-m, --mobile'.cyan, 'Generate jQuery mobile views from model'],
        ['-a, --api'.cyan, 'Generate restfull web api']
    );

    console.log(table.toString());
    console.log('\n');
    console.log(optionTable.toString());
};

/*
* Check validity of property type.
*/
function isValidPropertyType(type) {
    var validateType = ['STRING', 'TEXT', 'DATE', 'BOOLEAN', 'INTEGER', 'FLOAT'];
    if (validateType.contains(type)) {
        return true;
    } else {
        return false;
    }
};

/*
* Get model from arguments.
*/
function getModel(args) {
    var model = { name: args[0], properties: [] };
    var isValidateModel = true;

    for (var i = 1; i < args.length; i++) {
        var property = args[i].split(':');
        var name = property[0];
        var type = property[1].toUpperCase();

        if (isValidPropertyType(type)) {
            model.properties.push({ name: name, type: type });
        }
        else {
            isValidateModel = false;
            console.log('\nunknown type for property : '.red + name);
        }
    }

    if (isValidateModel) {
        console.log('');
        return model;
    } else {
        return null;
    }
}

/*
* Extend JavaScript Array prototype.
*/
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

// execute
// ==========================================

/*
* Parse shell commands.
*/
program.parse(process.argv);