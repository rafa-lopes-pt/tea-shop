import { NextFunction, Request, Response } from "express";

import session from "express-session";
import url from "url";

import HttpError from "../../utils/HttpError";

import HTTPCodes from "simple-http-codes";
import ApisRepository from "../../repositories/APIs.repository";
import GmailApiCredentials from "../types/GmailApiCredentials.type";

export default async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Handle the OAuth 2.0 server response
	const q = url.parse(req.url, true).query;

	const sessionState = (
		req.session as session.Session &
			Partial<session.SessionData> & { state: string }
	).state;

	if (q.error) {
		// An error response e.g. error=access_denied
		return next(
			new HttpError(HTTPCodes.ServerError.BAD_GATEWAY, "Bad Gateway", {
				error: q.error,
				context: "OAuth2 callback",
			})
		);
	} else if (q.state !== sessionState) {
		return next(
			new HttpError(
				HTTPCodes.Redirection.FOUND,
				"State session mismatch. Possible CSRF attack",
				{
					context: "OAuth2 callback",
					cause: "express session state mismatch",
				}
			)
		);
	} else {
		const code = q.code as string;
		// Get access and refresh tokens (if access_type is offline)
		const { tokens } = (await res.locals.oauth2Client.getToken(
			code
		)) as unknown as {
			tokens: { refresh_token: string };
		};

		ApisRepository.update(
			{
				_id: (res.locals.credentials as GmailApiCredentials)._id,
			},
			{ refreshToken: tokens.refresh_token }
		);

		return res.status(HTTPCodes.Success.NO_CONTENT).end();
	}
}
