module.exports = function (Sequelize, sequelize) {

	var article = sequelize.define('article', {
		
			
				title: Sequelize.STRING,
			
				content: Sequelize.TEXT,
			
		
	});
	return article;
}

