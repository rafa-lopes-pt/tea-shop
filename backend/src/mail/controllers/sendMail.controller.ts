import { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";
import HTTPCodes from "simple-http-codes";
import HttpError from "../../utils/HttpError";
import GmailApiCredentials from "../types/GmailApiCredentials.type";

export default async function sendMailController(
	req: Request,
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
		//send mail

		const toEmail = req.params.email;

		const mailOptions = {
			from: "Rafael Lopes <rafalopessecond@gmail.com>",
			to: toEmail,
			subject: "Activate your Tea-Shop Account!",
			text: "yay it works! :)",
			// html
		};

		await transporter?.sendMail(mailOptions);

		res.status(HTTPCodes.Success.OK).send({
			message: "Email sent to: " + toEmail,
		});
	} catch (error) {
		return next(error);
	}
}
