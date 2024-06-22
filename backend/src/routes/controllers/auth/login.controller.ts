import { NextFunction, Request, Response } from "express";
import { WithId } from "mongodb";
import HTTPCodes from "simple-http-codes";
import { DbUserSchemaType } from "../../../repositories/DbUser.type";
import HttpError from "../../../utils/HttpError";
import { compareHash, signToken } from "../../../utils/crypto";
import { authRepo } from "./auth.router";

export default async function loginController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { email, password } = req.body;

	//validate email and retrieve used data

	let existingUser: WithId<DbUserSchemaType> | undefined;

	try {
		const response = await authRepo.findOne({ email });

		if (response.error) {
			throw new HttpError("BAD_GATEWAY", response.message, {
				error: response.error,
				context: "searching for existing email on database",
				cause: "findOne method from MongoClientWrapper",
			});
		}

		existingUser = response.data;
	} catch (err) {
		return next(err);
	}

	if (!existingUser) {
		return res
			.status(HTTPCodes.ClientError.UNAUTHORIZED)
			.json({ message: "invalid credentials" });
	}

	// validate password

	if (!(await compareHash(password, existingUser.password))) {
		return res
			.status(HTTPCodes.ClientError.UNAUTHORIZED)
			.json({ message: "invalid credentials" });
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
				"FAILED_DEPENDENCY",
				"Logging in failed, please try again later.",
				{
					context: "Signing jwt token",
					cause: "signToken method",
					error,
				}
			)
		);
	}

	res.cookie("auth_token", token, { httpOnly: true });

	res.status(HTTPCodes.Success.OK).json({
		user: existingUser,
	});
}
