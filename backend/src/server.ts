import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import HTTPCodes from "simple-http-codes";
import router from "./routes/router";
import HttpError from "./utils/HttpError";

const server = express();
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

//====== ROUTES
server.get("/health", (_, res) => {
	res.status(HTTPCodes.ClientError.IM_A_TEAPOT).json({
		message: "Server is running, but refused to brew coffee with a teapot",
	});
});

server.use(router);

//====== ERROR HANDLING

server.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
	if (err instanceof HttpError) {
		err.log();
		return res
			.status(err.statusCode)
			.json({ ...err, message: err.message });
	}

	console.error(err);

	res.status(500).json(
		"Unexpected Server Error, please contact development team"
	);
});
server.use("*", (_, res) => {
	res.status(HTTPCodes.ServerError.NOT_IMPLEMENTED).json(
		"Endpoint not implemented"
	);
});

export default server;
