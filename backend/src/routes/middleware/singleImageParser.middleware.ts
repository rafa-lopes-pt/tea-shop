import { NextFunction, Request, Response } from "express";
import multer from "multer";
import HTTPCodes from "simple-http-codes";
import HttpError from "../../../../shared/types/HttpError/HttpError.type";
import { generateUUID } from "../../utils/crypto";
import sharp from "sharp";
import fs from "fs";
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 3 * 10 ** 6, //3mb
		files: 1,
	},
});

//upload.single("image")

async function singleImageValidatorMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const file = req.file;
	if (!file) {
		return next();
	}
	if (!file.mimetype.match(/jpeg|png|jpg/)) {
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

const singleImageParser = [
	upload.single("image"),
	singleImageValidatorMiddleware,
];
export default singleImageParser;
