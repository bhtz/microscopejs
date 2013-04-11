var routing = module.exports = function (app) {
    var self = this;
    var HomeController = require('../controllers/homeController');
    
    /*
    * Enable controller routing here.
    */
    self.controllerRouting = function () {
        var homeController = new HomeController(app);
        require('../controllers/accountController')(app);
    };

    /*
    * Enable api routing here.
    */
    self.apiRouting = function () {
        //require('../api/userApiController')(app);
    };

    return self;
}