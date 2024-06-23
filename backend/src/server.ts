import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import HTTPCodes from "simple-http-codes";
import timeoutMiddleware from "./routes/middleware/timeout.middleware";
import router from "./routes/router";
import HttpError from "./utils/HttpError";
const server = express();
server.use(morgan("dev"));
server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(timeoutMiddleware(15000));

//====== ROUTES

server.get("/health", (_, res) => {
	res.status(HTTPCodes.ClientError.IM_A_TEAPOT).json({
		message: "Server is running, but refused to brew coffee with a teapot",
	});
});

server.use(router);

//====== ERROR HANDLING

server.use(
	(error: Error, _req: Request, res: Response, _next: NextFunction) => {
		if (error instanceof HttpError) {
			error.log();
			return res
				.status(error.statusCode)
				.json({ ...error, message: error.message });
		}

		console.error(error);

		return res.status(500).json({
			message: "Unexpected Server Error, please contact development team",
			error,
		});

		_next(); //just so that eslint doesn't complain...its a very specific scenario, don't blame me
	}
);

server.use("*", (_, res) => {
	res.status(HTTPCodes.ServerError.NOT_IMPLEMENTED).json({
		message: "Endpoint not implemented",
	});
});

export default server;
