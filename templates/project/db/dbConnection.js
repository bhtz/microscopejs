/**
* Dependencies.
*/
var Sequelize = require("sequelize");
var dbConfig = require("../configs/database.json");

/**
 * connect to databse
 */
var db = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
	host: dbConfig.host,
	port: dbConfig.port,
	dialect: dbConfig.dialect
});

module.exports = db;

console.log('connecting to database !');