/**
* Account controller class
*/
var AccountController = module.exports = (function () {

    /*
    * Dependencies
    */
    var passport = require('passport'),
        bcrypt = require('bcrypt-nodejs'),
        MembershipFilters = require('../middleware/membershipFilters'),
        UserService = require('../services/userService');


    /**
    * Constructor.
    * @param {app} - express app.
    */
    function AccountController(app) {
        this.app = app;

        this.userService = new UserService();
        this.filters = new MembershipFilters();
        this.actions(this.app);
    }

    /**
    * Home Controller actions.
    * @param {app}
    */
    AccountController.prototype.actions = function (app) {
        var self = this;

        //login
        app.get('/account/login', function (req, res) {
            res.render('account/login');
        });

        // login post
        app.post('/account/login',
            passport.authenticate('local', { successRedirect: '/', failureRedirect: '/account/login' }),
            function (req, res) {
                res.redirect('/');
        });

        // logout
        app.get('/account/logout', function (req, res) {
            req.logout();
            res.redirect('/');
        });

        // changePassword get
        app.get('/account/changePassword', self.filters.authorize, function (req, res) {
            res.render('account/changePassword');
        });

        // changePassword get
        app.post('/account/changePassword', self.filters.authorize, function (req, res) {
            if (req.body.newPassword == req.body.confirmNewPassword) {
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
        });

        //register
        app.get('/account/register', function (req, res) {
            res.render('account/register');
        });

        //register post
        app.post('/account/register', function (req, res) {
            if (req.body.password == req.body.confirmPassword) {
                self.userService.getByUsername(req.body.username, function (user) {
                    if (!user) {
                        var hashedPassword = bcrypt.hashSync(req.body.password);
                        var user = {
                            username: req.body.username,
                            email: req.body.email,
                            password: hashedPassword
                        };
                        self.userService.save(user, function () {
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
        });
    };

    return AccountController;
})();
