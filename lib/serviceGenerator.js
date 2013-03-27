var serviceGenerator = module.exports = function () {
    var self = this;
		
	/*
    * Dependencies
    */
	var fs = require('fs');
    var ejs = require('ejs');
    var colors = require('colors');
		
	/*
    * check if service directory exist or create it asynchronously
    */
	self.generateService = function(model){
		if (model) {
            self.checkIfServiceDirectoryExist(function () {
                var filePath = process.cwd() + '/services/' + model.name + 'Service.js';
                var templatePath = process.cwd() + '/lib/template/serviceTemplate.ejs';

                var templateFile = fs.readFileSync(templatePath).toString();
                fs.writeFileSync(filePath, ejs.render(templateFile, { 'model': model }));

                var output = model.name + ' service created';
                console.log(output.cyan);
            });
        }
        else {
            console.log('no model found !');
        }
	};
	
	/*
    * check if service directory exist or create it asynchronously
    */
    self.checkIfServiceDirectoryExist = function (next) {
		var path = './services';
        fs.exists(path, function (exists) {
            if (exists) {
                fs.lstat(path,function (err, stats) {
					if(!err){
						if (stats.isDirectory()) {
							next();
						}
						else {
							fs.mkdir(path, 0777, function () {
								next();
							});
						}
					}
					else{
						console.log(err.red);
					}
                });
            }
            else {
                fs.mkdir(path, 0777, function () {
                    next();
                });
            }
        });
    };
	
    return self;
}