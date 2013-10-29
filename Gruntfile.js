module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
		test: {
			options: {
				reporter: 'spec'
			},
			src: ['tests/**/*.js']
		}
    }
  });

  // Load npm tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Register task(s).
  grunt.registerTask('default', ['mochaTest']);
  grunt.registerTask('test', ['mochaTest']);
};