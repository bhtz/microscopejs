/**
* HomeController class
*/
var HomeController = module.exports = (function () {

    /**
    * @param {app} - express app.
    */
    function HomeController(app) {
        this.app = app;
        this.filters = require('../middleware/membershipFilters')();
        this.Actions(this.app);
    }

    /**
    * Controller actions.
    * @param {app}
    */
    HomeController.prototype.Actions = function (app) {

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