import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import HTTPCodes from "simple-http-codes";
import generalErrorHandlerMiddleware from "./routes/middleware/generalErrorHandler.middleware";
import singleImageParser from "./routes/middleware/singleImageParser.middleware";
import timeoutMiddleware from "./routes/middleware/timeout.middleware";
import router from "./routes/router";

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

server.use(generalErrorHandlerMiddleware);

server.use("*", (_, res) => {
	res.status(HTTPCodes.ServerError.NOT_IMPLEMENTED).json({
		data: "Endpoint not implemented",
	});
});

export default server;
