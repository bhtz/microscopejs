/*
* Dependencies
*/
var passport          = require('passport');
var bcrypt            = require('bcrypt-nodejs');
var membershipFilters = require('../filters/membershipFilters');
var csrfFilters       = require('../filters/csrfFilters');
var UserDal           = require('../dal/userDal');

/**
* Account controller class
*/
(function () {

    /**
    * Attributes.
    */
    var userDal = new UserDal();

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
        app.all('/account/*', csrfFilters.csrf);

        app.get('/account/login', csrfFilters.antiForgeryToken, this.login);
        app.post('/account/login',
            passport.authenticate('local', { failureRedirect: '/account/login'}), this.redirectURL);
        app.get('/account/logout', this.logout);
        app.get('/account/changePassword', membershipFilters.authorize, csrfFilters.antiForgeryToken, this.changePassword);
        app.post('/account/changePassword', membershipFilters.authorize, this.changePassword_post);
        app.get('/account/register', csrfFilters.antiForgeryToken, this.register);
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
            userDal.getByUsername(req.body.username, function (user) {
                if (!user) {
                    encryptPassword(req.body.password, function(hashedpassword){
                        var newUser = {};
                        newUser.username = req.body.username;
                        newUser.email = req.body.email
                        newUser.password = hashedpassword;

                        userDal.save(newUser, function (data) {
                            req.flash('flash', 'you successfully sign in !');
                            res.redirect('/account/login');
                        });
                    });
                }
                else {
                    req.flash('flash', 'username already used !');
                    res.redirect('/account/register');
                }
            });
        }
        else {
            req.flash('flash', 'Password must be 6 length or confirmPassword error !');
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
        if (req.body.newPassword === req.body.confirmNewPassword && req.body.newPassword.length > 6) {
            userDal.get(req.user.id, function (user) {
                comparePassword(req.body.oldPassword, user.password, function(result){
                    if(result){
                        encryptPassword(req.body.newPassword, function(encryptedPassWord){
                            user.password = encryptedPassWord;
                            userDal.update(user, function (updatedUser) {
                                req.flash('flash', 'password change success !');
                                res.redirect('/');
                            });
                        });
                    }
                });
            });
        } else {
            req.flash('flash', 'Password must be 6 length or confirmPassword error !');
            res.redirect('/account/changePassword');
        }
    };

    /*
    * Redirect URL login
    */
    AccountController.prototype.redirectURL = function(req, res){
        var url = '/';
        if(req.query.returnUrl){
            url = req.query.returnUrl;
        }
        res.redirect(url);
    }

    /**
     * encrypted password
     * @param  {String}   password
     * @param  {Function} callback
     */
    var encryptPassword = function (password, callback){
        bcrypt.genSalt(10, function(err, salt) {
            if (err) console.log('error during encryption');
            bcrypt.hash(password, salt, null, function(err, cryptedPassWord) {
                if(err){ throw err; }
                else{
                    callback(cryptedPassWord);  
                }
            });
        });
    }

    /**
     * compare password and return callback if valid
     * @param  {String}   password
     * @param  {String}   encryptedPassWord
     * @param  {Function} callback
     */
    var comparePassword = function (password, encryptedPassWord, callback){
        bcrypt.compare(password, encryptedPassWord, function(err, result){
            if(err){throw err;}
            return callback(result);
        });
    }

    module.exports = AccountController;
})();