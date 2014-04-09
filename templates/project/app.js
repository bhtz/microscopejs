/**
 * Imports
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

/**
 * Application class.
 */
var Application = (function(){

    /**
    * Constructor.
    */
    function Application(){
        this.app = express();
        this.configurations();
        this.registerMiddleware();
        this.boot();
        this.run();
    };

    /**
     * Define application express configurations
     */
    Application.prototype.configurations = function() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.set('views', __dirname + '/app/views/');  
        this.app.set('view engine', 'ejs');
        this.app.set('layout', 'layout');

        this.app.engine('ejs', engine);
        this.app.locals({_layoutFile: true});
        require('express-helpers')(this.app);
    };

    /**
    * Register application middleware.
    */
    Application.prototype.registerMiddleware = function() {
        this.app.use(function (req, res, next) {
            res.locals.req = req;
            next();
        });
        
        this.app.use(function(req, res, next){
            res.locals.path = url.parse(req.url).pathname;
            next();
        });

        this.app.use(express.logger('dev'));
        this.app.use(express.cookieParser());
        this.app.use(express.bodyParser());
        this.app.use(express.methodOverride());
        this.app.use(express.session({ secret: 'microscopejsbhtz' }));
        this.app.use(express.errorHandler());

        this.app.use(require('./middleware/deviceHandler'));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use(flash());
        this.app.use(function(req, res, next){
            res.locals.flash = req.flash('flash');
            next();
        });

        this.app.configure('development', function () { });
        this.app.configure('production', function () {
            errorOptions = {};
        });
        this.app.use(require('./middleware/errorHandler')({ dumpExceptions: true, showStack: true }));

        var log4js = require('log4js');
        log4js.configure('./configs/logger.json', {});
        var logger = log4js.getLogger('file');
        logger.setLevel('INFO');
        this.app.use(log4js.connectLogger(logger));

        this.app.use(this.app.router);
    };

    /**
     * Boot application controller & api
     */
    Application.prototype.boot = function() {
        var bootloader = new Bootloader(this.app);
    };

    /**
     * run application
     */
    Application.prototype.run = function() {
        var self = this;
        var server = http.createServer(this.app).listen(this.app.get('port'), function(){
            console.log("\n microscope server listening on port " + self.app.get('port'));
        });
    };

    return Application;
})();

var application = new Application();