import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import HTTPCodes from "simple-http-codes";
import HttpError from "../../../../shared/types/HttpError/HttpError.type";
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 3 * 10 ** 6, //3mb
		files: 1,
	},
});

async function singleImageValidatorMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const file = req.file;
	if (!file) {
		return next();
	}
	if (!file.mimetype.match(/\.(jpeg|png|jpg)$/)) {
		return next(
			new HttpError(
				HTTPCodes.ClientError.BAD_REQUEST,
				"Unsupported Format"
			)
		);
	}

	//compress
	try {
		const compressedImg = await sharp(file.buffer)
			.webp()
			.resize(300, 300)
			.toBuffer();
		res.locals.fileBuffer = compressedImg;
	} catch (error) {
		next(
			new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				"Unable to parse image",
				{ error }
			)
		);
	}
	next();
}
/**
 * Reads a single jpeg|png|jpg file into memory with 3mb size limit.
 * Compresses and resizes the image into a 300px² .webp file, and stores it on
 * `res.locals.fileBuffer`
 */
const singleImageParser = [
	upload.single("image"),
	singleImageValidatorMiddleware,
];

export default singleImageParser;
