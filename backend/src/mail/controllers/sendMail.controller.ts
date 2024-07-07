import { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";
import HTTPCodes from "simple-http-codes";
import HttpError from "../../../../shared/types/HttpError/HttpError.type";
import GmailApiCredentials from "../types/GmailApiCredentials.type";

export default async function sendMailController(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	let transporter;
	try {
		const { clientId, clientSecret, refreshToken } = res.locals
			.credentials as GmailApiCredentials;

		if (!refreshToken) {
			throw new HttpError(
				HTTPCodes.ServerError.SERVICE_UNAVAILABLE,
				"refresh token expired, or was not found"
			);
		}

		res.locals.oauth2Client.setCredentials({ refresh_token: refreshToken });

		const accessToken = await res.locals.oauth2Client.getAccessToken();

		transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "rafalopessecond@gmail.com",
				clientId,
				clientSecret,
				refreshToken,
				accessToken,
			},
		});

		await transporter?.sendMail(res.locals.mail);

		res.status(HTTPCodes.Success.OK).send({
			message: "Activation link sent to" + res.locals.mail.to,
		});
	} catch (error) {
		return next(error);
	}
}
