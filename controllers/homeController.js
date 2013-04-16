/**
* Home controller class
*/
var HomeController = module.exports = (function () {

    var MembershipFilters = require('../middleware/membershipFilters');

    /**
    * @param {app} - express app.
    */
    function HomeController(app) {
        this.app = app;
        this.filters = new MembershipFilters();
        this.actions(this.app);
    }

    /**
    * Home Controller actions.
    * @param {app}
    */
    HomeController.prototype.actions = function (app) {

        //index
        app.get('/', function (req, res) {
            console.log(req.user);
            res.render('home/index');
        });

        //about
        app.get('/home/docs', function (req, res) {
            res.render('home/docs');
        });
    };

    return HomeController;
})();