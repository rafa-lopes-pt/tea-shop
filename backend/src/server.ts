import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import HTTPCodes from "simple-http-codes";
import timeoutMiddleware from "./routes/middleware/timeout.middleware";
import router from "./routes/router";
import HttpError from "../../shared/types/HttpError/HttpError.type";
import { inspect } from "node:util";
import singleImageParser from "./routes/middleware/singleImageParser.middleware";
import { MulterError } from "multer";

const server = express();
server.use(morgan("dev"));
server.use(timeoutMiddleware(15000));
server.disable("x-powered-by");
server.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

server.use(cookieParser());
server.use(singleImageParser);
server.use(express.json());
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
);

server.use("*", (_, res) => {
	res.status(HTTPCodes.ServerError.NOT_IMPLEMENTED).json({
		data: "Endpoint not implemented",
	});
});

export default server;
