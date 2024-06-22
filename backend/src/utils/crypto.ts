import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import HttpError from "./HttpError";
configDotenv();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new HttpError(
		"FAILED_DEPENDENCY",
		"missing jwt_secret env variable",
		{ context: "loading jwt secret" }
	);
}

export async function hashData(data: string) {
	return await bcrypt.hash(data, 12);
}

export async function compareHash(data: string, hashed: string) {
	return await bcrypt.compare(data, hashed);
}

export async function signToken(payload: object, expiresIn: string = "1h") {
	return jwt.sign(payload, JWT_SECRET as string, { expiresIn });
}
export async function verifyToken(token: string) {
	return jwt.verify(token, JWT_SECRET as string);
}
