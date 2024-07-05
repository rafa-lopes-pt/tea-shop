import { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import HttpError from "../../utils/HttpError";
import HTTPCodes from "simple-http-codes";
import ApisRepository from "../../repositories/APIs.repository";
import GmailApiCredentials from "../types/GmailApiCredentials.type";

const GCP_ID = process.env.GCP_ID;

if (!GCP_ID) {
	throw new HttpError(
		HTTPCodes.ServerError.SERVICE_UNAVAILABLE,
		"missing GCP_ID env variable"
	);
}

export default async function createOauthClientMiddleware(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const db_response = await ApisRepository.findOne({
			_id: GCP_ID,
		});

		if (db_response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				db_response.message,
				{
					error: db_response.error,
				}
			);
		}

		res.locals.credentials = db_response.data;

		const { clientId, clientSecret, redirectUri } =
			db_response.data as GmailApiCredentials;

		res.locals.oauth2Client = new google.auth.OAuth2(
			clientId,
			clientSecret,
			redirectUri
		);

		next();
	} catch (error) {
		next(
			new HttpError(
				HTTPCodes.ServerError.SERVICE_UNAVAILABLE,
				"No credentials found for gmail api. Unable to authenticate.",
				{ cause: "Loading credentials from db", error }
			)
		);
	}
}
