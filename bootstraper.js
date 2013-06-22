/**
* Routing class
*/
var Routing = module.exports = (function () {

    /**
    * Modules dependencies.
    */
    var fs = require('fs');

    /**
    * @param {app} - express app.
    */
    function Routing(app) {
        this.registerRoutes(app);
        this.registerApiRoutes(app);
    }

    /**
    * Routing actions.
    * @param {app}
    */
    Routing.prototype.registerRoutes = function (app) {
        loadControllerFromFolder('./controllers/', app);
    };

    /**
    * API Routing.
    * @param {app}
    */
    Routing.prototype.registerApiRoutes = function (app) {
        loadControllerFromFolder('./api/', app);
    };

    /**
    * Dynamically load controller from folder.
    *
    * @param {path} controllers folder path.
    * @param {app} express app.
    */
    function loadControllerFromFolder(folderpath, app){
        fs.readdir(folderpath, function(err, files){
            if(err) {throw err;}
            files.forEach(function(file){
                var Controller = require(folderpath+file);
                var controller = new Controller(app);
            });
        });
    };

    return Routing;
})();
