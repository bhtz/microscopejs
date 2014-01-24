module.exports = {
	styles: {
    	files: ['app/assets/**/*.styl'],
    	tasks: ['stylus:dev']
  	},
	scripts: {
		files: ['app/assets/**/*.js'],
		tasks: ['copy:scripts']
	},
    assets:{
        files: ['app/assets/images/**/*'],
        tasks: ['copy:images']
    }
};