module.exports = {
    options: {
        dst: './docs/annotated-source',
        layout: 'parallel'
    },
    docs: {
        files: [
            {
                expand: true,
                src: [
                    '**/*.js',
                    '!node_modules/**/*',
                    '!public/**/*',
                    '!logs/**/*'
                ]
            }
        ]
    }
};