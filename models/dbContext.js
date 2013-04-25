/**
* DbContext class
*/
var DbContext = module.exports = (function () {

    /**
    * Dependencies.
    */
    var Sequelize = require("sequelize");
    var dbConfig = require("../configs/database.json");

    /**
    * Constructor.
    * Add your entities 'DbSet' instance here.
    */
    function DbContext() {
        this.sequelize = this.initializeDatabase();

        this.user = require('./user')(Sequelize, this.sequelize);
    }

    /**
    * Database connection instance.
    * @return {sequelize} - return sequelize object instance.
    */
    DbContext.prototype.initializeDatabase = function () {
        return sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
            host: dbConfig.host,
            port: dbConfig.port,
            dialect: dbConfig.dialect
        });
    };

    /**
    * Manage Database entities associations.
    */
    DbContext.prototype.modelBuilder = function () {

    };

    /**
    * Database synchronization.
    */
    DbContext.prototype.sync = function () {
        this.modelBuilder();
        this.sequelize.sync();
    };

    /**
    * Drop all database tables.
    */
    DbContext.prototype.drop = function () {
        this.sequelize.drop();
    };

    return DbContext;
})();