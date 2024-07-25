import { NextFunction, Request, Response } from "express";
import { inspect } from "node:util";
import HTTPCodes from "simple-http-codes";
import { MulterError } from "multer";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";

export default function errorHandlersMiddleware(
	error: Error,
	req: Request,
	res: Response,
	_next: NextFunction
) {
	if (error instanceof HttpError) {
		return HttpErrorHandler(error, res);
	}

	if (error instanceof MulterError) {
		return MulterErrorHandler(error, res);
	}

	if (
		req.timedout &&
		(error as NodeJS.ErrnoException)?.code === "ETIMEDOUT"
	) {
		const message = `Request timed out`;
		console.log(message);
		return res
			.status(HTTPCodes.ServerError.GATEWAY_TIMEOUT)
			.json({ message });
	}

	//Generic error
	console.error(inspect(error, { depth: null }));

	return res.status(500).json({
		data: "Unexpected Server Error, please contact development team",
		error,
	});

	_next(); //just so that eslint doesn't complain...its a very specific scenario, don't blame me
}

function HttpErrorHandler(error: HttpError, res: Response) {
	error.log();
	return res.status(error.statusCode).json({
		...error,
		data: inspect(error.message, { depth: null }),
	});
}

function MulterErrorHandler(error: MulterError, res: Response) {
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
