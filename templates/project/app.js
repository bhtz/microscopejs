/**
 * Module dependencies.
 */
var express       = require('express');
var http          = require('http');
var path          = require('path');
var url           = require('url');
var engine        = require('ejs-locals');
var flash         = require('connect-flash');
var Bootloader    = require('./bootloader');

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Membership    = require('./middleware/membership');

var app = express();
var membership = new Membership(passport, LocalStrategy);

/**
 * main application configuration.
 */
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.set('views', __dirname + '/app/views/');  
    app.set('view engine', 'ejs');
    app.set('layout', 'layout');

    app.engine('ejs', engine);
    app.locals({_layoutFile: true});
    require('express-helpers')(app);

    app.use(function (req, res, next) {
        res.locals.req = req;
        next();
    });
    
    app.use(function(req, res, next){
        res.locals.path = url.parse(req.url).pathname;
        next();
    });

    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'microscopejsbhtz' }));
    app.use(express.errorHandler());

    app.use(require('./middleware/deviceHandler'));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
    app.use(function(req, res, next){
        res.locals.flash = req.flash('flash');
        next();
    });
    app.use(app.router);
});

/**
 * boot application with all modules.
 */
var bootloader = new Bootloader(app);

/**
* ERROR MANAGEMENT
* -------------------------------------------------------------------------------------------------
* error management - instead of using standard express / connect error management, we are going
* to show a custom 404 / 500 error using ejs and the middleware errorHandler (see ./middleware/errorHandler.js)
**/
var errorOptions = { dumpExceptions: true, showStack: true }
app.configure('development', function () { });
app.configure('production', function () {
    errorOptions = {};
});
app.use(require('./middleware/errorHandler')(errorOptions));

/*
 * Adding log4js logger middleware.
 */
var log4js = require('log4js');
log4js.configure('./configs/logger.json', {});
var logger = log4js.getLogger('file');
logger.setLevel('ERROR');
app.configure(function() {
    app.use(log4js.connectLogger(logger));
});

/**
 * Run server.
 */
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("\n microscope server listening on port " + app.get('port'));
});