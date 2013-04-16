module.exports = function (Sequelize, sequelize) {

	var user = sequelize.define('user', {
		username: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING
	});
	return user;
}

