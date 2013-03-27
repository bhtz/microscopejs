/**
* account controller 
* properties and actions
*/
var accountController = module.exports = function (app) {

    /*
    * Dependencies
    */
    var passport = require('passport');
    var bcrypt = require('bcrypt-nodejs');
    var UserService = require('../services/userService');
    var userService = new UserService();

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
    app.get('/account/changePassword', function (req, res) {
		res.render('account/changePassword');
    });

    // changePassword get
    app.post('/account/changePassword', function (req, res) {
		if(req.body.newPassword == req.body.confirmNewPassword){
			console.log('newpassword == confirmpassword');
			userService.get(req.user.id, function(user){
				if(bcrypt.compareSync(req.body.oldPassword, user.password)){
					console.log('old password confirmed !');
					user.password = bcrypt.hashSync(req.body.newPassword);
					userService.update(user, function(updatedUser){
						console.log('old password confirmed !');
						res.redirect('/');
					});
				}
				else{
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
            userService.getByUsername(req.body.username, function (user) {
                if (!user) {
                    var hashedPassword = bcrypt.hashSync(req.body.password);
                    var user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword
                    };
                    userService.save(user, function () {
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
}
