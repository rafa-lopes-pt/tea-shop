import HttpError from "../utils/HttpError";
import MongoClientWrapper from "./MongoClientWrapper";
import dotenv from "dotenv";
dotenv.config();
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
	throw new HttpError("FAILED_DEPENDENCY", "missing DB_URI env variable", {
		context: "creating db client",
	});
}

const dbClient = new MongoClientWrapper(DB_URI);

export default dbClient;
