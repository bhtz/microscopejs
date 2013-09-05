/**
* Dependencies.
*/
var Sequelize = require("sequelize");
var dbConfig = require("../configs/database.json");

/**
* DbContext class
*/
(function () {

    /**
    * Constructor.
    * Add your entities 'DbSet' instance here like user.
    */
    function DbContext() {
        this.context = this.getContext();

        this.user = require('./user')(Sequelize, this.context);
    }

    /**
    * Database connection instance.
    * @return {sequelize} - return sequelize object instance.
    */
    DbContext.prototype.getContext = function () {
        return sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
            host: dbConfig.host,
            port: dbConfig.port,
            dialect: dbConfig.dialect
        });
    };

    /**
    * Manage Database entities associations.
    */
    DbContext.prototype.modelBuilder = function (){};

    /**
    * Database - models synchronization.
    */
    DbContext.prototype.sync = function () {
        this.modelBuilder();
        this.context.sync();
    };

    /**
    * Drop all database tables.
    */
    DbContext.prototype.drop = function () {
        this.context.drop();
    };

    return module.exports = DbContext;
})();
