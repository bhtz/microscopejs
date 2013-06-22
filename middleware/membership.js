/**
* Module dependencies.
*/
var bcrypt = require('bcrypt-nodejs');
var UserService = require('../services/userService');

/**
* Membership class
*/
var Membership = module.exports = (function () {

    /**
    * Attributes.
    */
    var userService = new UserService();

    /**
    * Constructor.
    * @param {passport} - passport instance.
    * @param {LocalStrategy} - LocalStrategy authentication provider.
    */
    function Membership(passport, Strategy) {
        this.initialize(passport, Strategy);
    }

    /**
    * Initialize membership provider.
    * @param {passport} - passport instance.
    * @param {LocalStrategy} - LocalStrategy authentication provider.
    */
    Membership.prototype.initialize = function (passport, LocalStrategy) {

        passport.serializeUser(function (user, callback) {
            callback(null, user.id);
        });

        passport.deserializeUser(function (id, callback) {
            userService.get(id, function (user) {
                callback(null, user);
            });
        });

        // configure passport Strategy
        passport.use(new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            function (username, password, callback) {
                // var username = username;
                // var password = password;
                console.log(password);
                if(password.length > 6){
                    userService.getByUsername(username, function (user) {
                        if(user){
                            if (bcrypt.compareSync(password, user.password)) {
                                return callback(null, user);
                            }
                            else {
                                console.log('Incorrect password.');
                                return callback(null, false, { message: 'Incorrect password.' });
                            }
                        }
                        else {
                            console.log('Incorrect username');
                            return callback(null, false, { message: 'Incorrect username' });
                        }
                    });
                }else{
                    console.log('password length error');
                    return callback(null, false, { message: 'password length must be 6 or more.' });
                }
            }
        ));
    };

    return Membership;
})();
