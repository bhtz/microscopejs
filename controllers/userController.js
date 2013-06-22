/**
* Module dependencies.
*/
var MembershipFilters = require('../middleware/membershipFilters');
var UserService = require('../services/userService');

/**
* UserController class
*/
var UserController = module.exports = (function () {

    /**
    * Attributes.
    */
    var userService = new UserService();
    var filters = new MembershipFilters();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function UserController(app) {
        this.routes(app);
    }

    /**
    * UserController routes.
    * @param {app} - express app.
    */
    UserController.prototype.routes = function(app) {
        app.get('/user', filters.authorize, this.index);
        app.get('/user/details/:id', filters.authorize, this.details);
        app.get('/user/create', filters.authorize, this.create);
        app.post('/user/create', filters.authorize, this.create_post);
        app.get('/user/edit/:id', filters.authorize, this.edit);
        app.post('/user/edit', filters.authorize, this.edit_post);
        app.get('/user/delete/:id', filters.authorize, this.delete);
        app.post('/user/delete', filters.authorize, this.delete_post);
    };

    /**
    * [httpget]
    * UserController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserController.prototype.index = function(req, res) {
        userService.getAll(function (users) {
            res.render('user/index', { 'users': users });
        });
    };

    /**
    * [httpget]
    * UserController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserController.prototype.details = function(req, res) {
        var userId = req.params.id;
        userService.get(userId, function (user) {
            res.render('user/details', { 'user': user });
        });
    };

    /**
    * [httpget]
    * UserController edit action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserController.prototype.edit = function(req, res) {
        var userId = req.params.id;
        userService.get(userId, function (user) {
            res.render('user/edit', { 'user': user });
        });
    };

    /**
    * [httppost]
    * UserController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserController.prototype.edit_post = function(req, res) {
        var user = req.body;
        userService.update(user, function (user) {
            res.redirect('/user');
        });
    };    

    /**
    * [httpget]
    * UserController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserController.prototype.create = function(req, res) {
        var user = {};
        res.render('user/create', { 'user': user });  
    };

    /**
    * [httppost]
    * UserController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserController.prototype.create_post = function(req, res) {
        userService.save(req.body, function (data) {
            res.redirect('/user');
        });
    };

    /**
    * [httpget]
    * UserController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserController.prototype.delete = function(req, res) {
        var userId = req.params.id;
        userService.get(userId, function (user) {
            res.render('user/delete', { 'user': user });
        });
    };

    /**
    * [httppost]
    * UserController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    UserController.prototype.delete_post = function(req, res) {
        userService.remove(req.body.id, function (data) {
            res.redirect('/user');
        });
    };

    return UserController;
})();
