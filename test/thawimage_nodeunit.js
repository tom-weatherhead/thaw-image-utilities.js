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
			console.log('nodeunit: Test \'Create ThAWImage\' : engine is', engine);
			// console.log('nodeunit: Test \'Create ThAWImage\' : engine.imageEngine is', engine.imageEngine);

			// const image = new engine.imageEngine.ThAWImage(7, 13);
			const image = engine.createImage(7, 13);

			test.expect(4);
			test.strictEqual(image.width, 7, '');
			test.strictEqual(image.height, 13, '');
			test.strictEqual(image.bytesPerPixel, 4, '');
			test.strictEqual(image.bytesPerLine, 28, '');
			test.done();
		}
	}
};
