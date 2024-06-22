import dotenv from "dotenv";
import MongoClientWrapper from "./database/MongoClientWrapper";
import server from "./server";
import dbClient from "./database/DatabaseClient";

dotenv.config();

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`[server]: server is running on port ${port}`);
});

function cleanup() {
	try {
		dbClient.close();
	} catch (error) {
		//trying to close nonexistent connections
	}

	console.log("a cleanup was performed");
}
process.on("SIGINT", cleanup);
process.on("uncaughtException", cleanup);
