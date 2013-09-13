/**
* Module dependencies.
*/
var bcrypt = require('bcrypt-nodejs');
var UserDal = require('../app/dal/userDal');

/**
* Membership class
*/
(function () {

    /**
    * Attributes.
    */
    var userDal = new UserDal();

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
            userDal.get(id, function (user) {
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
                if(password.length > 6){
                    userDal.getByUsername(username, function (user) {
                        if(user){
                            bcrypt.compare(password, user.password, function(err, res){
                                if(res){
                                    callback(null, user);
                                }
                                else{
                                    console.log('Incorrect password.');
                                    callback(null, false, { message: 'Incorrect password.' });
                                }
                            });
                        }
                        else {
                            console.log('Incorrect username');
                            callback(null, false, { message: 'Incorrect username' });
                        }
                    });
                }else{
                    console.log('password length error');
                    callback(null, false, { message: 'password length must be 6 or more.' });
                }
            }
        ));
    };

    module.exports = Membership;
})();
