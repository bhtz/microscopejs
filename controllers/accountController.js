/*
* Dependencies
*/
var passport = require('passport'),
    bcrypt = require('bcrypt-nodejs'),
    MembershipFilters = require('../middleware/membershipFilters'),
    UserService = require('../services/userService');

/**
* Account controller class
*/
var AccountController = module.exports = (function () {

    /**
    * Attributes.
    */
    var userService = new UserService();
    var filters = new MembershipFilters();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function AccountController(app) {
        this.routes(app);
    }

    /**
    * AccountController routes.
    */
    AccountController.prototype.routes = function(app) {
        app.get('/account/login', this.login);
        app.post('/account/login',
            passport.authenticate('local', { successRedirect: '/', failureRedirect: '/account/login' }), 
            this.redirectHome);
        app.get('/account/logout', this.logout);
        app.get('/account/changePassword', filters.authorize, this.changePassword);
        app.post('/account/changePassword', filters.authorize, this.changePassword_post);
        app.get('/account/register', this.register);
        app.post('/account/register', this.register_post);
    };

    /**
    * [httpget]
    * login method.
    */
    AccountController.prototype.login = function(req, res) {
        res.render('account/login');
    };

    /**
    * [httpget]
    * logout method.
    */
    AccountController.prototype.logout = function(req, res) {
        req.logout();
        res.redirect('/');
    };

    /**
    * [httpget]
    * Register action.
    */
    AccountController.prototype.register = function(req, res) {
        res.render('account/register');
    };

    /**
    * [httppost]
    * Register post action.
    */
    AccountController.prototype.register_post = function(req, res) {
        if (req.body.password === req.body.confirmPassword && req.body.password.length > 6) {
            userService.getByUsername(req.body.username, function (user) {
                if (!user) {
                    var hashedPassword = bcrypt.hashSync(req.body.password);
                    var newUser = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword
                    };
                    userService.save(newUser, function (data) {
                        res.redirect('/account/login');
                    });
                }
                else {
                    res.redirect('/account/register');
                }
            });
        }
        else {
            res.redirect('/account/register');
        }
    };

    /**
    * change password.
    */
    AccountController.prototype.changePassword = function(req, res) {
        res.render('account/changePassword');
    };

    /**
    * [httppost]
    * change password.
    */
    AccountController.prototype.changePassword_post = function(req, res) {
        if (req.body.newPassword == req.body.confirmNewPassword && req.body.password.length > 6) {
            self.userService.get(req.user.id, function (user) {
                if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
                    user.password = bcrypt.hashSync(req.body.newPassword);
                    self.userService.update(user, function (updatedUser) {
                        res.redirect('/');
                    });
                }
                else {
                    res.redirect('/account/changePassword');
                }
            });
        }
    };
      
    /**
    * Redirect to home.
    */
    AccountController.prototype.redirectHome = function(req, res) {
        console.log('redirect to home called');
        res.redirect('/');
    };

    return AccountController;
})();