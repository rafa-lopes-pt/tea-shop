import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";

export default async function imageOwnerAuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.path !== `/resources/profile-images/${res.locals.email}.webp`) {
		return res
			.status(HTTPCodes.ClientError.FORBIDDEN)
			.json({ data: "Unauthorized" });
	}
	next();
}
