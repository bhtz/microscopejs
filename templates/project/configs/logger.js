var log4js = require('../node_modules/log4js');

log4js.configure({
	appenders: [
		{ type: 'console' },
		{ 
			type 	 	: 'file', 
			filename 	: "logs/microscopejs.log"
		}
	]
});

var logger  = log4js.getLogger('Microscopejs');

logger.setLevel('DEBUG');

Object.defineProperty(
	exports, 
	"LOG", 
	{value:logger}
);