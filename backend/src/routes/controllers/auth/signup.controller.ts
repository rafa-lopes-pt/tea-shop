import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
import { SignupSchemaType } from "../../../../../shared/schemas/signup.schema";
import { UserSchemaType } from "../../../../../shared/schemas/user.schema";
import UserRepository from "../../../repositories/User.repository";
import HttpError from "../../../utils/HttpError";
import { hashData } from "../../../utils/crypto";

export default async function signupController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { name, email, password } = req.body as SignupSchemaType;

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

	const user: UserSchemaType & { password: string } = {
		name,
		email,
		password: hashedPassword,
		notifyByEmail: false,
		notifyBySms: false,
	};

	try {
		const response = await UserRepository.insert(user);

		if (response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				response.message,
				{
					error: response.error,
					context: "creating new user at signup",
					cause: "repository insert method",
				}
			);
		}
	} catch (err) {
		return next(err);
	}

	res.status(HTTPCodes.Success.CREATED).json();
}
