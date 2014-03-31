module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	
	grunt.initConfig({
		'clean':{
			'default':{
				'src': ['dist']
			}
		},

		'copy': {
			'default': {
				'files': [
					{
						'expand': true,
						'dot': true,
						'cwd': 'app',
						'dest': 'dist',
						'src': [
							'*.{ico,png,txt}',
							'*.html',
							'views/{,*/}*.html',
							'images/{,*/}*.{webp}'
						]
					},
					{
						'expand': true,
						'cwd': '.tmp/images',
						'dest': 'dist/images',
						'src': ['generated/*']
					}
				]
			}
		},

		'bowerInstall': {
			'default': {
				'src': ['app/{,*/}*.html'],
				'ignorePath': 'app/'
			}
		},

		'useminPrepare': {
			'html': 'app/index.html',
			'options': {
				'dest': 'dist'
			}
		},

		'usemin': {
			'html': ['dist/{,*/}*.html'],
			'css': ['dist/css/{,*/}*.css'],
			'options': {
				'assetsDirs': ['dist']
			}
		}
	});

	grunt.registerTask('default', [
		'clean',
		'bowerInstall',
		'useminPrepare',
		'copy',
		'concat',
		'cssmin',
		'uglify',
		'usemin'
	]);
};