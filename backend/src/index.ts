import dotenv from "dotenv";
import dbClient from "./database/DatabaseClient";
import server from "./server";

dotenv.config();

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`[server]: server is running on port ${port}`);
});

async function cleanup() {
	await dbClient.close(true);
	console.log("a cleanup was performed");
	process.exit(0);
}

process.on("SIGINT", cleanup);
