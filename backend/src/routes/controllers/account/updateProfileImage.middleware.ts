import { NextFunction, Request, Response } from "express";
import fs from "fs";
import HTTPCodes from "simple-http-codes";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
import sharp from "sharp";
export default async function updateProfileImageMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	//save image to disk
	try {
		const resourceDir = "resources/profile-images/";
		const path = `${resourceDir}${res.locals.email}.webp`;
		//the file will always have the same name...so this flag prevents unnecessary calls to db
		let alreadyDefined;

		if (!fs.existsSync(resourceDir)) {
			fs.mkdirSync("./" + resourceDir, { recursive: true });
		} else {
			alreadyDefined = fs.existsSync(path);
		}

		fs.writeFileSync("./" + path, res.locals.fileBuffer);

		if (alreadyDefined) {
			console.log("already created");

			return res.status(HTTPCodes.Success.CREATED).end();
		}

		req.body = {
			image: `${req.protocol}://${req.headers.host}/${path}`,
		};
		return next();
	} catch (error) {
		return next(
			new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				"Could not save file",
				{ error, cause: "saving file to disk" }
			)
		);
	}
}
