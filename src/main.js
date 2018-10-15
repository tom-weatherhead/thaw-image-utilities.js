// thaw-image-utilities.js/src/main.js

'use strict';

const fs = require('fs');
const jpeg = require('jpeg-js');

const imageEngine = require('./thawimage');
const ThAWImage = imageEngine.ThAWImage;

// const defaultBytesPerPixel = 4;
const defaultJpegQuality = 50;
// const byteAlignmentOfLines = 4;

/*
function getBytesPerLine (width, bytesPerPixel) {
	return width * bytesPerPixel;
	// return Math.ceil(width * bytesPerPixel / byteAlignmentOfLines) * byteAlignmentOfLines;
}
/* */

function createImage (width, height, bytesPerPixel = undefined) {
	/*
	console.log('createImage() : bytesPerPixel is', bytesPerPixel);
	console.log('createImage() : defaultBytesPerPixel is', defaultBytesPerPixel);

	if (!bytesPerPixel) {
		bytesPerPixel = defaultBytesPerPixel;
		console.log('createImage() : bytesPerPixel is now', bytesPerPixel);
	}

	const bytesPerLine = getBytesPerLine(width, bytesPerPixel);

	console.log('createImage() : bytesPerLine is', bytesPerLine);

	return {
		width: width,
		height: height,
		bytesPerPixel: bytesPerPixel,
		bytesPerLine: bytesPerLine,
		data: Buffer.alloc(bytesPerLine * height)		// Buffer.unsafealloc() ?
	};
	console.log('ThAWImage is', ThAWImage);
	*/

	return new ThAWImage(width, height, bytesPerPixel);
}

function loadImageFromJpegFile (srcFilePath) {
	const srcJpegData = fs.readFileSync(srcFilePath);
	const srcImage = jpeg.decode(srcJpegData);

	/*
	console.log('loadImageFromJpegFile() : srcImage before is', srcImage);

	srcImage.bytesPerPixel = defaultBytesPerPixel;
	srcImage.bytesPerLine = getBytesPerLine(srcImage.width, srcImage.bytesPerPixel);

	console.log('loadImageFromJpegFile() : srcImage after is', srcImage);

	return srcImage;

	console.log('ThAWImage is', ThAWImage);
	*/

	return new ThAWImage(srcImage.width, srcImage.height, 0, 0, srcImage.data);
}

function saveImageToJpegFile (dstImage, dstFilePath, dstQuality) {
	// console.log('saveImageToJpegFile() : dstImage is', dstImage);

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
	// imageEngine: imageEngine,
	createImage: createImage,
	loadImageFromJpegFile: loadImageFromJpegFile,
	saveImageToJpegFile: saveImageToJpegFile
};
