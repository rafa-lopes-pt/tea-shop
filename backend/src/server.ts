import express, { Request, Response } from "express";

const server = express();
server.use(express.json());

server.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ message: "server is running" });
});

export default server;
