var userController = module.exports = function(app) {

    /*
    * Dependencies
    */
    var userService = require('../services/userService');
    userService = new userService();
    //get this dependency to use filters.authorize attribute
    var filters = require('../middleware/membershipFilters')();
 
    // ============================================== 
 
    // actions ===================================== 
 
    // index 
    app.get('/user', filters.authorize, function (req, res) { 
        userService.getAll(function(users) { 
            res.render('user/index', {'users': users}); 
        }); 
    }); 
 
    // details 
    app.get('/user/details/:id', filters.authorize, function (req, res) { 
        var userId = req.params.id; 
        userService.get(userId, function(user) { 
            res.render('user/details', {'user': user}); 
        }); 
    }); 
 
    // create get 
    app.get('/user/create', filters.authorize, function (req, res) { 
		var user = {}; 
        res.render('user/create', {'user': user}); 
    }); 
 
    // create post 
    app.post('/user/create', filters.authorize, function (req, res) { 
        userService.save(req.body, function(data) { 
            res.redirect('/user'); 
        }); 
    }); 
 
    // edit get 
    app.get('/user/edit/:id', filters.authorize, function (req, res) { 
        var userId = req.params.id; 
        console.log('id to update' + userId); 
        userService.get(userId, function (user) { 
            res.render('user/edit', { 'user': user }); 
        }); 
    }); 
 
    // edit post 
    app.post('/user/edit', filters.authorize, function (req, res) { 
        var user = req.body; 
        userService.update(user, function(user) { 
            res.redirect('/user'); 
        }); 
    }); 
 
    // delete get 
    app.get('/user/delete/:id', filters.authorize, function (req, res) { 
        var userId = req.params.id; 
        userService.get(userId, function(user) { 
            res.render('user/delete', {'user': user}); 
        }); 
    }); 
 
    // delete post 
    app.post('/user/delete', filters.authorize, function (req, res) { 
        userService.remove(req.body.id, function(data) { 
			res.redirect('/user'); 
        }); 
    }); 
 
    // ============================================== 
}; 
