/**
* Module dependencies.
*/
var MembershipFilters = require('../middleware/membershipFilters')
    UserService = require('../services/userService');

/**
* Home controller class
*/
var HomeController = module.exports = (function () {

    /**
    * Attributes.
    */
    var userService = new UserService();
    var filters = new MembershipFilters();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function HomeController(app) {
        this.routes(app);
    }

    /**
    * HomeController routing.
    */
    HomeController.prototype.routes = function(app) {
        app.get('/', this.index);
        app.get('/home/docs', this.docs);
        app.get('/home/test', this.test);
    };

    /**
    * [HttpGet].
    * HomeController Index action.
    */
    HomeController.prototype.index = function(req, res) {
        res.render('home/index');
    };

    /**
    * [HttpGet].
    * HomeController docs action.
    */
    HomeController.prototype.docs = function(req, res) {
        res.render('home/docs');
    };

    return HomeController;
})();
