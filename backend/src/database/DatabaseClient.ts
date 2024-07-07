import HTTPCodes from "simple-http-codes";
import HttpError from "../../../shared/types/HttpError/HttpError.type";
import MongoClientWrapper from "./MongoClientWrapper";
import dotenv from "dotenv";
dotenv.config();
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
	throw new HttpError(
		HTTPCodes.ServerError.SERVICE_UNAVAILABLE,
		"missing DB_URI env variable",
		{
			context: "creating db client",
		}
	);
}

const dbClient = new MongoClientWrapper(DB_URI);

export default dbClient;
