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

server.get("/health", (_, res) => {
	res.status(HTTPCodes.ClientError.IM_A_TEAPOT).json({
		message: "Server is running, but refused to brew coffee with a teapot",
	});
});

server.use(router);

server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err);

	if (err instanceof HttpError) {
		return res.status(err.status).json(err.message);
	}

	return res.status(500).json("Unexpected Server Error");
});

server.use("*", (_, res) => {
	res.status(HTTPCodes.ServerError.NOT_IMPLEMENTED).json(
		"Endpoint not implemented"
	);
});
export default server;
