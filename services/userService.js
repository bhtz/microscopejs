/**
* UserService class
*/
var UserService = module.exports = (function () {

    /**
    * Dependencies.
    */
    var DbContext = require('../models/dbContext');

    /**
    * Constructor.
    */
    var UserService = function () {
        this.dbContext = new DbContext();
    }

    /**
    * Get a user by id.
    * @param {userId} - user primary key.
    * @param {next} - callback function. 
    */
    UserService.prototype.get = function (userId, next) {
        this.dbContext.users.find(userId).success(function (user) {
            next(user);
        });
    }

    /**
    * Get user by username.
    * @param {username} - user name.
    * @param {next} - callback function. 
    */
    UserService.prototype.getByUsername = function (username, next) {
        this.dbContext.users.find({ where: { username: username} }).success(function (user) {
            next(user);
        });
    }

    /**
    * Get all user.
    * @param {next} - callback function. 
    */
    UserService.prototype.getAll = function (next) {
        this.dbContext.users.findAll({ order: 'id DESC' }).success(function (users) {
            next(users);
        });
    }

    /**
    * Persist user to database.
    * @param {user} - user instance.
    * @param {next} - callback function. 
    */
    UserService.prototype.save = function (user, next) {
        var user = this.dbContext.users.build(user);
        user.save().success(function (user) {
            next(user);
        }).error(function (error) {
            next({ message: error });
        });
    }

    /**
    * Update user.
    * @param {user} - user instance.
    * @param {next} - callback function. 
    */
    UserService.prototype.update = function (user, next) {
        user.save().success(function (user) {
            next(user);
        }).error(function (error) {
            next({ message: error });
        });
    }

    /**
    * Delete user.
    * @param {userId} - user primary key.
    * @param {next} - callback function. 
    */
    UserService.prototype.remove = function (userId, next) {
        this.dbContext.users.find(userId).success(function (user) {
            user.destroy().complete(function (error) {
                next(error);
            });
        });
    }

    return UserService;

})();
