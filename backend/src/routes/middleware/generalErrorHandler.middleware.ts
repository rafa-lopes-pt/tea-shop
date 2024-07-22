import { NextFunction, Request, Response } from "express";
import HttpError from "../../../../shared/types/HttpError/HttpError.type";
import { inspect } from "node:util";
import HTTPCodes from "simple-http-codes";
import { MulterError } from "multer";
export default function generalErrorHandlerMiddleware(
	error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	if (error instanceof HttpError) {
		error.log();
		return res.status(error.statusCode).json({
			...error,
			data: inspect(error.message, { depth: null }),
		});
	}

	if (error instanceof MulterError) {
		console.error(inspect(error, { depth: null }));
		if (error.code === "LIMIT_UNEXPECTED_FILE")
			return res
				.status(HTTPCodes.ClientError.BAD_REQUEST)
				.json({ data: "Unsupported file" });
		else if (error.code === "LIMIT_FILE_SIZE") {
			return res
				.status(HTTPCodes.ClientError.BAD_REQUEST)
				.json({ data: "File too big" });
		} else {
			return res
				.status(HTTPCodes.ClientError.BAD_REQUEST)
				.json({ data: "Unsupported Request" });
		}
	}

	console.error(error);

	return res.status(500).json({
		data: "Unexpected Server Error, please contact development team",
		error,
	});

	_next(); //just so that eslint doesn't complain...its a very specific scenario, don't blame me
}
