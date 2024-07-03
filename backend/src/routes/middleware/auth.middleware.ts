import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/crypto";
import HttpError from "../../utils/HttpError";
import Token from "../../types/Token.type";
import HTTPCodes from "simple-http-codes";

export default async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.cookies?.["auth_token"];
		if (!token) {
			throw new Error("missing authorization token");
		}

		const decodedToken = (await verifyToken(token)) as Token;

		// verify that required properties are present
		if (
			!Object.entries(decodedToken).every(
				([key, value]) =>
					["_id", "email", "iat", "exp"].includes(key) && value
			)
		)
			throw new Error(
				"Corrupted access token. Token is valid but misses required data"
			);

		res.locals._id = decodedToken._id;
		res.locals.email = decodedToken.email;

		next();
	} catch (error) {
		return next(
			new HttpError(
				HTTPCodes.ClientError.UNAUTHORIZED,
				(error as Error)?.message || "invalid access token",
				{
					error,
					context: "auth middleware",
				}
			)
		);
	}
}
