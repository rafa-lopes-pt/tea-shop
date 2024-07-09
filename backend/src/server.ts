import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import HTTPCodes from "simple-http-codes";
import timeoutMiddleware from "./routes/middleware/timeout.middleware";
import router from "./routes/router";
import HttpError from "../../shared/types/HttpError/HttpError.type";
import { inspect } from "node:util";

const server = express();
server.use(morgan("dev"));
server.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
server.use(cookieParser());
server.disable("x-powered-by");
server.use(express.json());
server.use(timeoutMiddleware(15000));

//====== ROUTES

server.get("/health", (_, res) => {
	res.status(HTTPCodes.ClientError.IM_A_TEAPOT).json({
		data: "Server is running, but refused to brew coffee with a teapot",
	});
});

server.use(router);

//====== ERROR HANDLING

server.use(
	(error: Error, _req: Request, res: Response, _next: NextFunction) => {
		if (error instanceof HttpError) {
			error.log();
			return res.status(error.statusCode).json({
				...error,
				data: inspect(error.message, { depth: null }),
			});
		}

		console.error(error);

		return res.status(500).json({
			data: "Unexpected Server Error, please contact development team",
			error,
		});

		_next(); //just so that eslint doesn't complain...its a very specific scenario, don't blame me
	}
);

server.use("*", (_, res) => {
	res.status(HTTPCodes.ServerError.NOT_IMPLEMENTED).json({
		data: "Endpoint not implemented",
	});
});

export default server;
