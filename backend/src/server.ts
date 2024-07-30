import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import errorHandlersMiddleware from "./routes/middleware/error-handlers/error-handlers.middleware";
import singleImageParser from "./routes/middleware/singleImageParser.middleware";
import router from "./routes/router";

const server = express();
server.use(morgan("dev"));
server.use(
	cors({
		// origin: ["https://tea-shop-rafa-lopes-pt.netlify.app"],
		credentials: true,
	})
);

server.use(cookieParser());
server.use(singleImageParser);
server.use(express.json());

server.use(router);

server.use(errorHandlersMiddleware);

export default server;
