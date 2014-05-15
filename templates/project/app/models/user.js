module.exports = function (db, DataTypes) {

	var User = db.define('user', {
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING
	});

	return User;
}