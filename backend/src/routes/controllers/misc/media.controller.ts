import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";

export default function mediaController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const path = req.path;
		console.log(path);

		return res.status(200).sendFile(path, { root: "./src" });
	} catch (error) {
		next(
			new HttpError(HTTPCodes.ClientError.NOT_FOUND, "Not Found", {
				error,
			})
		);
	}
}
