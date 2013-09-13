module.exports = function (db, DataTypes) {

	var User = db.define('User', {
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING
	});

	return User;
}