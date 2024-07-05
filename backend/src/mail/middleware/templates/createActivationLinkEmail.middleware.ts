import { NextFunction, Request, Response } from "express";
import HttpError from "../../../utils/HttpError";
import HTTPCodes from "simple-http-codes";
3;

const FRONTEND_URI = process.env.FRONTEND_URI;

if (!FRONTEND_URI) {
	throw new HttpError(
		HTTPCodes.ServerError.SERVICE_UNAVAILABLE,
		"missing GCP_ID env variable"
	);
}
export default async function createActivationLinkEmail(
	req: Request,
	res: Response,
	next: NextFunction
) {
	//url -> send-activation-link/:email?token=
	const email = req.params.email;
	const token = req.query.token;

	res.locals.mail = {
		from: "Rafael Lopes <rafalopessecond@gmail.com>",
		to: email,
		subject: "Activate your Tea-Shop Account!",
		text: `yay it works! :)\n\n use this link to activate!\n\n ${FRONTEND_URI}/activate/${token}`,
		// html
	};
	next();
}
