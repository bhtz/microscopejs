/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* UserDal class
*/
(function () {

	/**
	 * Attributes
	 */
	var dbContext = new DbContext();
        
    /**
    * Constructor.
    */
    var UserDal = function () {
        
    }

    /**
    * Get a user by id.
    * @param {userId} - user primary key.
    * @param {callback} - callback function. 
    */
    UserDal.prototype.get = function (userId, callback) {
        dbContext.user.find(userId).success(function (user) {
            callback(user);
        });
    };

    /**
    * Get user by username.
    * @param {username} - user name.
    * @param {callback} - callback function. 
    */
    UserDal.prototype.getByUsername = function (username, callback) {
        dbContext.user.find({ where: { username: username} }).success(function (user) {
            if(!user) {
                callback(null);
            }
            else{
                callback(user);
            }
        });
    };

    /**
    * Get all user.
    * @param {callback} - callback function. 
    */
    UserDal.prototype.getAll = function (callback) {
        dbContext.user.findAll({ order: 'id DESC' }).success(function (users) {
            callback(users);
        });
    };

    /**
    * Persist user to database.
    * @param {user} - user instance.
    * @param {callback} - callback function. 
    */
    UserDal.prototype.save = function (user, callback) {
        dbContext.user.build(user)
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
    * @param {callback} - callback function. 
    */
    UserDal.prototype.update = function (user, callback) {
        user.save().success(function (user) {
            callback(user);
        }).error(function (error) {
            callback({ message: error });
        });
    };

    /**
    * Delete user.
    * @param {userId} - user primary key.
    * @param {callback} - callback function. 
    */
    UserDal.prototype.remove = function (userId, callback) {
        dbContext.user.find(userId).success(function (user) {
            user.destroy().complete(function (error) {
                callback(error);
            });
        });
    };

    module.exports = UserDal;
})();