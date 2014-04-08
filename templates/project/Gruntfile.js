module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config     : require('./grunt_tasks/config'),
		copy       : require('./grunt_tasks/copy'),
		clean      : require('./grunt_tasks/clean'),
		stylus     : require('./grunt_tasks/stylus'),
		watch      : require('./grunt_tasks/watch'),
		nodemon    : require('./grunt_tasks/nodemon'),
		concurrent : require('./grunt_tasks/concurrent'),
		open       : require('./grunt_tasks/open'),
		docco      : require('./grunt_tasks/docco'),
	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-docco2');

	// Default task(s).
	grunt.registerTask('default', ['build']);

	grunt.registerTask('docs', ['clean', 'docco']);

	grunt.registerTask('build', ['docs', 'copy:vendors', 'copy:scripts', 'copy:images', 'stylus:dev']);
	grunt.registerTask('build:release', ['clean', 'copy:release', 'stylus:release']);

	grunt.registerTask('debug', ['build', 'concurrent:debug']);
};