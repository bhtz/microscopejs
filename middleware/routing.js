var routing = module.exports = function(app){
	var self = this;

	/*
	* Enable controller routing here.
	*/
	self.controllerRouting = function(){
		require('../controllers/homeController')(app);
		require('../controllers/accountController')(app);
	};

	/*
	* Enable api routing here.
	*/
	self.apiRouting = function(){
		//require('../api/userApiController')(app);
	};

	return self;
}