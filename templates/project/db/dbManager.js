var DbContext = require('./dbContext');

/**
 * DbManager class.
 */
(function(){

	var dbContext = new DbContext();

	/**
	* Constructor.
	*/
	function DbManager(){

	};

    /**
    * Database - models synchronization.
    */
    DbManager.prototype.synchronize = function () {
        dbContext.db.sync();
    };

    /**
    * Drop all database tables.
    */
    DbManager.prototype.drop = function () {
        dbContext.db.drop();
    };

    /**
     * Run fixtures
     */
    DbManager.prototype.runFixtures = function() {
        require('./dbFixtures')();
    };

	module.exports = DbManager;
})();