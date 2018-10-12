// thaw-image-utilities.js/Gruntfile.js

'use strict';

module.exports = grunt => {
	const packageJsonFilename = 'package.json';
	const gruntfile = grunt.file.readJSON(packageJsonFilename);

	grunt.initConfig({
		pkg: gruntfile,
		eslint: {
			target: [
				'*.js',
				'src/*.js',
				'test/*.js'
			]
		},
		/* mochaTest: {
			options: {
				reporter: 'spec'
			},
			test: {
				src: ['test/*_spec.js']
			}
		}, */
		nodeunit: {
			all: ['test/*_nodeunit.js']
		},
		nsp: {
			package: gruntfile
		}
	});

	// Tasks
	grunt.loadNpmTasks('grunt-eslint');
	// grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-nsp');

	// Aliases

	// Old: $ npm i -D chai chai-http grunt grunt-cli grunt-eslint grunt-mocha-test grunt-nsp mocha
	// Old: grunt.registerTask('test', ['eslint', 'mochaTest', 'nsp']);

	// New: $ npm i -D grunt grunt-cli grunt-eslint grunt-contrib-nodeunit grunt-nsp
	// - Also install nodeunit-httpclient for Web tests.

	grunt.registerTask('test', ['eslint', 'nodeunit', 'nsp']);

	grunt.registerTask('default', ['test']);
};
