import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/crypto";
import HttpError from "../../utils/HttpError";

export default async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.cookies?.["auth_token"];
		console.log("Token", token);

		if (!token) {
			throw new Error("missing authorization token");
		}
		console.log("there is a token");

		await verifyToken(token);
		next();
	} catch (error) {
		return next(
			new HttpError("UNAUTHORIZED", "invalid access token", {
				error,
				context: "auth middleware",
			})
		);
	}
}
