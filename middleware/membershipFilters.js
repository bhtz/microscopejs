/**
* MembershipFilters class
*/
var MembershipFilters = module.exports = (function () {

    /**
    * Constructor.
    */
    function MembershipFilters() {
    }

    /**
    * MembershipFilters actions.
    * @param {req} - http request.
    * @param {res} - http response.
    * @param {next} - callback.
    */
    MembershipFilters.prototype.authorize = function (req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/account/login');
    }

    return MembershipFilters;
})();