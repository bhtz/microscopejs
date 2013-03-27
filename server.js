/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , partials = require('express-partials');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Initialize DbContext and synchronize with database
var dbContext = require('./models/dbContext')();
dbContext.sync();

// initialize membership
var membership = require('./middleware/membership')(passport, LocalStrategy, dbContext);

var app = express();
// configuration
app.configure(function () {
    app.set('port', process.env.PORT || 3000);

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(partials());
    app.set('layout', 'layout');

    app.use(express.favicon());
    app.use(express.logger('development'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'keyboard cat' }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(require('./middleware/deviceHandler'));

    app.use(function (req, res, next) {
        res.locals.req = req;
        next();
    });
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

/**
* ERROR MANAGEMENT
* -------------------------------------------------------------------------------------------------
* error management - instead of using standard express / connect error management, we are going
* to show a custom 404 / 500 error using jade and the middleware errorHandler (see ./middleware/errorHandler.js)
**/
var errorOptions = { dumpExceptions: true, showStack: true }
app.configure('development', function () { });
app.configure('production', function () {
    errorOptions = {};
});
app.use(require('./middleware/errorHandler')(errorOptions));

// Controller Routing
// Enable your controllers here
require('./controllers/homeController')(app);
require('./controllers/accountController')(app);

// Api Routing
// Enable your apiControllers here
//require('./api/userApiController')(app);

// Initialize application server 
http.createServer(app).listen(app.get('port'), function(){
  console.log("microscope application listening on port " + app.get('port'));
});
