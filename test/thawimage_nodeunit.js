// thaw-image-utilities.js/test/thawimage_nodeunit.js

'use strict';

const engine = require('..');

module.exports = {
	'Create ThAWImage': {
		setUp: function (done) {
			console.log('nodeunit: Test \'Create ThAWImage\' : setUp()');
			done();
		},
		test: function (test) {
			console.log('nodeunit: Test \'Create ThAWImage\' : test()');

			const image = new engine.imageEngine.ThAWImage(7, 13);

			test.expect(2);
			test.strictEqual(image.width, 7, '');
			test.strictEqual(image.height, 13, '');
			test.done();
		}
	}
};
