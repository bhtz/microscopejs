/**
* authorize users filters
*/
exports.authorize = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log('user isAuthenticated');
        return next();
    }
    else {
        console.log('user not isAuthenticated');
        if(req.xhr){
            res.send("You're not authorize to perform this action");
        }else{
            var url = req.url;
            res.redirect('/account/login?returnUrl='+url);
        }
    }
};