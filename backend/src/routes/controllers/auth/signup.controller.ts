import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
import { SignupSchemaType } from "../../../../../shared/schemas/signup.schema";
import UserRepository from "../../../repositories/User.repository";
import HttpError from "../../../utils/HttpError";
import { hashData, signToken } from "../../../utils/crypto";

export default async function signupController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { name, email, password } = req.body as SignupSchemaType;

	//check if user already exists
	try {
		const db_response = await UserRepository.has({ email });
		if (db_response.data) {
			return res
				.status(HTTPCodes.ClientError.CONFLICT)
				.json({ message: "Email already exists" });
		}

		if (db_response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				db_response.message,
				{
					error: db_response.error,
					context: "checking if user exists for signup",
					cause: "repository has method",
				}
			);
		}
	} catch (err) {
		return next(err);
	}

	const hashedPassword = await hashData(password);

	//create activation token
	let token;
	try {
		token = await signToken(
			{
				name,
				email,
				password: hashedPassword,
			},
			"15m"
		);
	} catch (error) {
		return next(
			new HttpError(
				HTTPCodes.ServerError.SERVICE_UNAVAILABLE,
				"Unable to sign token",
				{
					context: "creating account activation token",
					cause: "signToken method",
					error,
				}
			)
		);
	}

	//redirect to mailing service
	res.redirect(
		HTTPCodes.Redirection.FOUND,
		`/send-activation-link/${email}?token=${token}`
	);
}
