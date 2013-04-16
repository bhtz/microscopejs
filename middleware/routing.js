/**
* Routing class
*/
var Routing = module.exports = (function () {

    /**
    * Modules dependencies.
    */
    var HomeController = require('../controllers/homeController');
    var AccountController = require('../controllers/accountController');

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
        var homeController = new HomeController(app);
        var accountController = new AccountController(app);
    };

    /**
    * API Routing.
    * @param {app}
    */
    Routing.prototype.registerApiRoutes = function (app) {

    };

    return Routing;
})();