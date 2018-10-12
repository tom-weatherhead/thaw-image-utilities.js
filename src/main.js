'use strict';

const fs = require('fs');
const jpeg = require('jpeg-js');

function createImage (width, height, bytesPerPixel = 4) {
	const bytesPerLine = bytesPerPixel * width;
	//const bytesPerLine = Math.ceil(bytesPerPixel * width / 4) * 4;	// Ensure 4-byte alignment.

	return {
		width: width,
		height: height,
		bytesPerPixel: bytesPerPixel,
		bytesPerLine: bytesPerLine,
		data: Buffer.alloc(bytesPerLine * height)		// Buffer.unsafealloc() ?
	};
}

function loadImageFromJpegFile (srcFilePath) {
	const srcJpegData = fs.readFileSync(srcFilePath);
	const srcImage = jpeg.decode(srcJpegData);

	srcImage.bytesPerPixel = 4;
	//srcImage.bytesPerLine = Math.ceil(srcImage.width * srcImage.bytesPerPixel / 4) * 4;
	srcImage.bytesPerLine = srcImage.width * srcImage.bytesPerPixel;

	return srcImage;
}

function saveImageToJpegFile (dstImage, dstFilePath, dstQuality) {
	const defaultJpegQuality = 50;

	if (!dstImage) {
		console.error('saveImageToJpegFile() : Error: dstImage is', dstImage);
	} else {

		if (dstQuality === undefined || dstQuality < 0 || dstQuality > 100) {
			dstQuality = defaultJpegQuality;
		} else {
			dstQuality = Math.round(dstQuality);
		}

		const dstJpegData = jpeg.encode(dstImage, dstQuality);

		fs.writeFileSync(dstFilePath, dstJpegData.data);
	}
}

module.exports = {
	createImage: createImage,
	loadImageFromJpegFile: loadImageFromJpegFile,
	saveImageToJpegFile: saveImageToJpegFile
};
