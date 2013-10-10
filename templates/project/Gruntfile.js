module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config : require('./grunt_tasks/config'),
		copy : require('./grunt_tasks/copy'),
		clean : require('./grunt_tasks/clean'),
		stylus : require('./grunt_tasks/stylus')
	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task(s).
	grunt.registerTask('default', ['build']);

	grunt.registerTask('build', ['clean', 'copy:dev', 'stylus:dev']);
	grunt.registerTask('build:release', ['clean', 'copy:release', 'stylus:release']);
};