import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
/**
 * Sets a timeout in ms for requests
 * @default 10s
 */
export default function timeoutMiddleware(time: number = 10000) {
	return (req: Request, res: Response, next: NextFunction) => {
		res.setTimeout(time, () => {
			const message = `Request timed out in ${time}ms`;

			console.log(message);

			res.status(HTTPCodes.ServerError.GATEWAY_TIMEOUT).json({
				message,
			});
		});

		next();
	};
}
