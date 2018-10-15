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
		this.data = data ? data : Buffer.alloc(this.bytesPerLine * this.height); // Buffer.unsafealloc() ?
		// console.log('this.width is', this.width);
		// console.log('this.height is', this.height);
		// console.log('this.bytesPerPixel is', this.bytesPerPixel);
		// console.log('this.bytesPerLine is', this.bytesPerLine);
		// console.log('this.data is', this.data);
	}

	// test () {
	// 	console.log('Success!');
	// }
}

module.exports = {
	ThAWImage: ThAWImage // ,
	// defaultBytesPerPixel: defaultBytesPerPixel
};
