module.exports = {
	options:{
    	ignore: [
    		'app/assets/**',
            'app/views/**',
    		'public/**',
    		'node_modules/**',
    		'bower_components/**',
    		'grunt_tasks/**'
    	]
    },
    application: {
        script: ['app.js']
    }
}