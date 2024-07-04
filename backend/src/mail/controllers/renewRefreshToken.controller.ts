import { Request, Response } from "express";
import crypto from "crypto";
import session from "express-session";

export default async function (req: Request, res: Response) {
	const state = crypto.randomBytes(32).toString("hex");
	(
		req.session as session.Session &
			Partial<session.SessionData> & { state: string }
	).state = state;

	const authorizationUrl = res.locals.oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: ["https://mail.google.com/"],
		include_granted_scopes: true,
		state: state,
	});

	res.redirect(authorizationUrl);
}
