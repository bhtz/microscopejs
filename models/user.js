module.exports = function (Sequelize, sequelize) {
	return user = sequelize.define('user', {
		username: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING
	});
}