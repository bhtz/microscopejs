var dbContext = module.exports = function () {
    var self = this;

    /*
    * Dependencies
    */
    var Sequelize = require("sequelize");
    var dbConfig = require("../configs/database.json");

    // database connection configuration.
    var sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect
    });

    // DbContext definition 
    // enable your model entities.
    self.users = require('./user')(Sequelize, sequelize);
    
    // Manage entities associations.
    var modelBuider = function(){

    };

    // Database synchronization.
    self.sync = function(){
        modelBuider();
        sequelize.sync();
    };

    // Drop all database tables.
    self.drop = function(){
        sequelize.drop();
    };

    return self;
}