// thaw-image-utilities.js/src/main.js

'use strict';

// const fs = require('fs');
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

function factory_loadImageFromJpegFile (options) {
	return srcFilePath => {
		const srcJpegData = options.fs.readFileSync(srcFilePath);
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
	};
}

function factory_saveImageToJpegFile (options) {
	return (dstImage, dstFilePath, dstQuality) => {
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

			options.fs.writeFileSync(dstFilePath, dstJpegData.data);
		}
	};
}

module.exports = options => {
	let result = {
		// imageEngine: imageEngine,
		createImage: createImage
	};

	if (options && options.fs) {
		result.loadImageFromJpegFile = factory_loadImageFromJpegFile(options);
		result.saveImageToJpegFile = factory_saveImageToJpegFile(options);
	} else {
		result.loadImageFromJpegFile = srcFilePath => {
			console.log('Stub: loadImageFromJpegFile:');
			console.log('  srcFilePath is', srcFilePath);
		};
		result.saveImageToJpegFile = (dstImage, dstFilePath, dstQuality) => {
			console.log('Stub: saveImageToJpegFile:');
			console.log('  dstImage is', dstImage);
			console.log('  dstFilePath is', dstFilePath);
			console.log('  dstQuality is', dstQuality);
		};
	}

	return result;
};
