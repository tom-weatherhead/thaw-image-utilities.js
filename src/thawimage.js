// thaw-image-utilities.js/src/thawimage.js

'use strict';

const defaultBytesPerPixel = 4;

function getBytesPerLine (width, bytesPerPixel) {
	return width * bytesPerPixel;
	// return Math.ceil(width * bytesPerPixel / byteAlignmentOfLines) * byteAlignmentOfLines;
}

class ThAWImage {
	constructor (width, height, bytesPerPixel = 0, bytesPerLine = 0, data = undefined) {
		this.width = width;
		this.height = height;
		this.bytesPerPixel = bytesPerPixel ? bytesPerPixel : defaultBytesPerPixel;
		this.bytesPerLine = bytesPerLine ? bytesPerLine : getBytesPerLine(this.width, this.bytesPerPixel);
		this.data = data ? data : Buffer.alloc(bytesPerLine * height);
	}

	test () {
		console.log('Success!');
	}
}

module.exports = {
	ThAWImage: ThAWImage,
	defaultBytesPerPixel: defaultBytesPerPixel
};
