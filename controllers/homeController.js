/**
* Module dependencies.
*/
var MembershipFilters = require('../middleware/membershipFilters');

/**
* Home controller class
*/
var HomeController = module.exports = (function () {

    /**
    * Attributes.
    */
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
