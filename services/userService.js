var DbContext = require('../models/dbContext');

/**
* UserService class
*/
var UserService = module.exports = (function () {
        
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
        this.dbContext.user.find(userId).success(function (user) {
            next(user);
        });
    };

    /**
    * Get user by username.
    * @param {username} - user name.
    * @param {next} - callback function. 
    */
    UserService.prototype.getByUsername = function (username, next) {
        this.dbContext.user.find({ where: { username: username} }).success(function (user) {
            if(!user) {
                next(null);
            }
            else{
                next(user);
            }
        });
    };

    /**
    * Get all user.
    * @param {next} - callback function. 
    */
    UserService.prototype.getAll = function (next) {
        this.dbContext.user.findAll({ order: 'id DESC' }).success(function (users) {
            next(users);
        });
    };

    /**
    * Persist user to database.
    * @param {user} - user instance.
    * @param {next} - callback function. 
    */
    UserService.prototype.save = function (user, callback) {
        this.dbContext.user.build(user)
        .save()
        .success(function(model) {
            callback(model);
        }).error(function(error) {
            callback(error);
        });
    };

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
    };

    /**
    * Delete user.
    * @param {userId} - user primary key.
    * @param {next} - callback function. 
    */
    UserService.prototype.remove = function (userId, next) {
        this.dbContext.user.find(userId).success(function (user) {
            user.destroy().complete(function (error) {
                next(error);
            });
        });
    };

    return UserService;
})();