import cors from "cors";
import express from "express";
import morgan from "morgan";
import HTTPCodes from "simple-http-codes";
import router from "./routes/router";

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



server.use("*", (_, res) => {
	res.status(HTTPCodes.ServerError.NOT_IMPLEMENTED).json(
		"Endpoint not implemented"
	);
});
export default server;
