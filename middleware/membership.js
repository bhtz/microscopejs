/**
* Membership class
*/
var Membership = module.exports = (function () {

    /**
    * Module dependencies.
    */
    var DbContext = require('../models/dbContext');
    var bcrypt = require('bcrypt-nodejs');

    /**
    * Constructor.
    * @param {passport} - passport instance.
    * @param {LocalStrategy} - LocalStrategy authentication provider.
    */
    function Membership(passport, LocalStrategy) {
        var dbContext = new DbContext();
        this.initialize(passport, LocalStrategy);
    }

    /**
    * Initialize membership provider.
    * @param {passport} - passport instance.
    * @param {LocalStrategy} - LocalStrategy authentication provider.
    */
    Membership.prototype.initialize = function (passport, LocalStrategy) {
        var self = this;
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, next) {
            dbContext.user.find(id).success(function (user) {
                next(null, user);
            });
        });

        // configure passport Strategy
        passport.use(new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            function (username, password, done) {
                dbContext.user.find({ where: { username: username} }).success(function (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                }).error(function (error) {
                    return done(error);
                });
            }
        ));
    };

    return Membership;
})();