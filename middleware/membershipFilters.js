var membershipFilters = module.exports = function () {
    var self = this;

    // authorize filter
    self.authorize = function (req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/account/login');
    };

    return self;
}