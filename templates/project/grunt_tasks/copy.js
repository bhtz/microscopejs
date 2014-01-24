module.exports = {
	vendors: {
		files: [
			{expand: true, cwd: '<%= config.bower %>/bootstrap/dist/fonts/', src: ['**'], dest: '<%= config.public %>/fonts/'},
			{src: '<%= config.bower %>/bootstrap/dist/css/bootstrap.css', dest: '<%= config.public %>/styles/bootstrap.css'},
			{src: '<%= config.bower %>/bootstrap/dist/js/bootstrap.js', dest: '<%= config.public %>/scripts/vendors/bootstrap.js'},
			{src: '<%= config.bower %>/jquery/jquery.js', dest: '<%= config.public %>/scripts/vendors/jquery.js'},
			{src: '<%= config.bower %>/animate.css/animate.css', dest: '<%= config.public %>/styles/animate.css'},
		]
	},
	release:{
		files: [
			{expand: true, cwd: '<%= config.bower %>/bootstrap/dist/fonts/', src: ['**'], dest: '<%= config.public %>/fonts/'},
			{src: '<%= config.bower %>/bootstrap/dist/css/bootstrap.min.css', dest: '<%= config.public %>/styles/bootstrap.css'},
			{src: '<%= config.bower %>/bootstrap/dist/js/bootstrap.min.js', dest: '<%= config.public %>/scripts/vendors/bootstrap.js'},
			{src: '<%= config.bower %>/jquery/jquery.min.js', dest: '<%= config.public %>/scripts/vendors/jquery.js'},
			{src: '<%= config.bower %>/animate.css/animate.css', dest: '<%= config.public %>/styles/animate.css'},
			{expand: true, cwd: '<%= config.assets %>/scripts/', src: ['**'], dest: '<%= config.public %>/scripts/'},
			{expand: true, cwd: '<%= config.assets %>/images/', src: ['**'], dest: '<%= config.public %>/images/'}
		]
	},
	scripts:{
		files:[
			// assets scripts
	  		{expand: true, cwd: '<%= config.assets %>/scripts/', src: ['**'], dest: '<%= config.public %>/scripts/'}
		]
	},
	images:{
		files:[
			// assets images
	  		{expand: true, cwd: '<%= config.assets %>/images/', src: ['**'], dest: '<%= config.public %>/images/'}
		]
	}
}