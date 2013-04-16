/**
* UserController class
*/
var UserController = module.exports = (function () {

    /**
    * Module dependencies.
    */
    var MembershipFilters = require('../middleware/membershipFilters');
    var UserService = require('../services/userService');

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function UserController(app) {
        this.app = app;
        this.userService = new UserService();
        this.filters = new MembershipFilters();
        this.actions(this.app);
    }

    /**
    * User Controller actions.
    * @param {app}
    */
    UserController.prototype.actions = function (app) {
        var self = this;

        // index 
        app.get('/user', self.filters.authorize, function (req, res) {
            this.userService.getAll(function (users) {
                res.render('user/index', { 'users': users });
            });
        });

        // details 
        app.get('/user/details/:id', self.filters.authorize, function (req, res) {
            var userId = req.params.id;
            this.userService.get(userId, function (user) {
                res.render('user/details', { 'user': user });
            });
        });

        // create get 
        app.get('/user/create', self.filters.authorize, function (req, res) {
            var user = {};
            res.render('user/create', { 'user': user });
        });

        // create post 
        app.post('/user/create', self.filters.authorize, function (req, res) {
            this.userService.save(req.body, function (data) {
                res.redirect('/user');
            });
        });

        // edit get 
        app.get('/user/edit/:id', self.filters.authorize, function (req, res) {
            var userId = req.params.id;
            this.userService.get(userId, function (user) {
                res.render('user/edit', { 'user': user });
            });
        });

        // edit post 
        app.post('/user/edit', self.filters.authorize, function (req, res) {
            var user = req.body;
            this.userService.update(user, function (user) {
                res.redirect('/user');
            });
        });

        // delete get 
        app.get('/user/delete/:id', self.filters.authorize, function (req, res) {
            var userId = req.params.id;
            this.userService.get(userId, function (user) {
                res.render('user/delete', { 'user': user });
            });
        });

        // delete post 
        app.post('/user/delete', self.filters.authorize, function (req, res) {
            this.userService.remove(req.body.id, function (data) {
                res.redirect('/user');
            });
        });
    };

    return UserController;
})();
