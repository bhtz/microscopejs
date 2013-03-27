/**
 * home controller 
 * properties and actions
 */
module.exports = function (app) {

    /*
    * Dependencies
    */
    //get this dependency to use filters.authorize attribute
    var filters = require('../middleware/membershipFilters')();

    //index
    app.get('/', function (req, res) {
        console.log(req.user);
        res.render('home/index');
    });

    //about
    app.get('/home/docs', function (req, res) {
        res.render('home/docs');
    });
}