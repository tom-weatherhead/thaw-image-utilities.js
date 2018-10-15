// thaw-image-utilities.js/src/main.js

'use strict';

const fs = require('fs');
const jpeg = require('jpeg-js');

const imageEngine = require('./thawimage.js');
const ThAWImage = imageEngine.ThAWImage;

// const defaultBytesPerPixel = 4;
const defaultJpegQuality = 50;
// const byteAlignmentOfLines = 4;

function getBytesPerLine (width, bytesPerPixel) {
	return width * bytesPerPixel;
	// return Math.ceil(width * bytesPerPixel / byteAlignmentOfLines) * byteAlignmentOfLines;
}

function createImage (width, height, bytesPerPixel = undefined) {
	/*
	const bytesPerLine = getBytesPerLine(width, bytesPerPixel);

	return {
		width: width,
		height: height,
		bytesPerPixel: bytesPerPixel,
		bytesPerLine: bytesPerLine,
		data: Buffer.alloc(bytesPerLine * height)		// Buffer.unsafealloc() ?
	};
	*/
	return new ThAWImage(width, height, bytesPerPixel);
}

function loadImageFromJpegFile (srcFilePath) {
	const srcJpegData = fs.readFileSync(srcFilePath);
	const srcImage = jpeg.decode(srcJpegData);

	srcImage.bytesPerPixel = imageEngine.defaultBytesPerPixel;
	srcImage.bytesPerLine = getBytesPerLine(srcImage.width * srcImage.bytesPerPixel);

	return srcImage;
}

function saveImageToJpegFile (dstImage, dstFilePath, dstQuality) {

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
	imageEngine: imageEngine,
	createImage: createImage,
	loadImageFromJpegFile: loadImageFromJpegFile,
	saveImageToJpegFile: saveImageToJpegFile
};
