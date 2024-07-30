import { NextFunction, Request, Response } from "express";
import { WithId } from "mongodb";
import HTTPCodes from "simple-http-codes";
import { DbUserSchemaType } from "../../../repositories/types/DbUser.type";
import UserRepository from "../../../repositories/User.repository";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
import { compareHash, signToken } from "../../../utils/crypto";
import { CLIENT_SESSION_LIFETIME_MS } from "../../../../../shared/utils/misc";
export default async function loginController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { email, password } = req.body;

	//validate email and retrieve used data

	let existingUser: WithId<DbUserSchemaType>;

	try {
		const response = await UserRepository.findOne({ email });

		if (response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				response.message,
				{
					error: response.error,
					context: "searching for existing email on database",
					cause: "repository findOne method",
				}
			);
		}

		existingUser = response.data as WithId<DbUserSchemaType>;
	} catch (err) {
		return next(err);
	}

	if (!existingUser) {
		return res
			.status(HTTPCodes.ClientError.UNAUTHORIZED)
			.json({ data: "invalid credentials" });
	}

	// validate password

	if (!(await compareHash(password, existingUser.password))) {
		return res
			.status(HTTPCodes.ClientError.UNAUTHORIZED)
			.json({ data: "invalid credentials" });
	}

	// create token

	let token;
	try {
		token = await signToken({
			_id: existingUser._id,
			email: existingUser.email,
		});
	} catch (error) {
		return next(
			new HttpError(
				HTTPCodes.ServerError.SERVICE_UNAVAILABLE,
				"Logging in failed, please try again later.",
				{
					context: "Signing jwt token",
					cause: "signToken method",
					error,
				}
			)
		);
	}

	res.cookie("auth_token", token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		maxAge: CLIENT_SESSION_LIFETIME_MS,
	});

	const { _id, password: _hashedPassword, ...user } = existingUser;
	res.status(HTTPCodes.Success.OK).json({ data: user });
}
