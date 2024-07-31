import { NextFunction, Request, Response } from "express";
import fs from "fs";
import HTTPCodes from "simple-http-codes";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
export default async function updateProfileImageMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	//save image to disk
	try {
		const resourceDir = "./src/resources/profile-images",
			file = `${res.locals.email}.webp`,
			filePath = `${resourceDir}/${file}`;
		//the file will always have the same name...so this flag prevents unnecessary calls to db
		let alreadyDefined;

		if (!fs.existsSync(resourceDir)) {
			fs.mkdirSync(resourceDir, { recursive: true });
		} else {
			alreadyDefined = fs.existsSync(filePath);
		}

		fs.writeFileSync(filePath, res.locals.fileBuffer);

		if (alreadyDefined) {
			return res.status(HTTPCodes.Success.CREATED).end();
		}

		req.body = {
			image: `${req.protocol}://${req.headers.host}/resources/profile-images/${res.locals.email}.webp`,
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
