// thaw-image-utilities.js/test/thawimage_spec.js

'use strict';

const assert = require('assert').strict;

const engine = require('..')();

describe('App', () => {
	describe('Create ThAWImage', () => {
		it('Rocks!', done => {
			// Arrange

			// Act
			const image = engine.createImage(7, 13);

			// Assert
			assert.equal(image.width, 7);
			assert.equal(image.height, 13);
			assert.equal(image.bytesPerPixel, 4);
			assert.equal(image.bytesPerLine, 28);

			done();
		});
	});
});
