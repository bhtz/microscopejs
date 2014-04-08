/**
* authorize users filters
*/
var authorize = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        if(req.xhr){
            res.send("You're not authorize to perform this action");
        }else{
            res.redirect('/account/login');
        }
    }
};

module.exports = {
    authorize: authorize
};