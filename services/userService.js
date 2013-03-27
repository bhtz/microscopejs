var userService = module.exports = function() { 
 
    var self = this; 
 
    // Dependencies 
    var dbContext = require('../models/dbContext')();
 
    // get user by id 
    self.get = function(userId, next) { 
        dbContext.users.find(userId).success(function(user) { 
            next(user); 
        });
    };

    // get user by username
    self.getByUsername = function (username, next) {
        dbContext.users.find({ where: { username: username} }).success(function (user) {
            next(user);
        });
    }; 
 
    // get all user 
    self.getAll = function(next) { 
        dbContext.users.findAll({order: 'id DESC'}).success(function(users) { 
            next(users); 
        }); 
    }; 
 
    // save user 
    self.save = function(user, next) { 
        var user = dbContext.users.build(user); 
        user.save().success(function(user) { 
            next(user); 
        }).error(function(error) { 
            next({message: error}); 
        }); 
    }; 
 
    // edit a user 
    self.update = function(user, next) { 
        user.save().success(function (user) { 
            next(user); 
        }).error(function(error) { 
            next({message: error}); 
        }); 
    }; 
 
    // delete an user 
    self.remove = function(userId, next) { 
    	console.log('le ID en params : '+userId);      
        dbContext.users.find(userId).success(function(user) { 
			user.destroy().complete(function(error) { 
				next(error); 
			}); 
        }) 
    }; 
 
    return self; 
};
