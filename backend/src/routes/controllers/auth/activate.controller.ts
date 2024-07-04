import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
import { SignupSchemaType } from "../../../../../shared/schemas/signup.schema";
import { UserSchemaType } from "../../../../../shared/schemas/user.schema";
import UserRepository from "../../../repositories/User.repository";
import HttpError from "../../../utils/HttpError";
import { verifyToken } from "../../../utils/crypto";

export default async function activateController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.params.token;

	let user: (UserSchemaType & { password: string }) | undefined;

	try {
		const { name, email, password } = (await verifyToken(
			token
		)) as SignupSchemaType;

		user = {
			name,
			email,
			password,
			notifyByEmail: false,
			notifyBySms: false,
		};
	} catch (error) {
		next(
			new HttpError(HTTPCodes.ClientError.UNAUTHORIZED, "Expired token")
		);
	}

	try {
		const alreadyExists = await UserRepository.has({ email: user?.email });
		if (alreadyExists.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				alreadyExists.message,
				{
					error: alreadyExists.error,
					context:
						"checking if user exists before activating account",
				}
			);
		}

		if (alreadyExists.data) {
			return res.status(HTTPCodes.ClientError.FORBIDDEN).json({
				message: "Account already activated",
			});
		}

		console.log("\n\n\nim here", user, "\n\n\n\n\n\n");

		const response = await UserRepository.insert(
			user as UserSchemaType & { password: string }
		);

		if (response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				response.message,
				{
					error: response.error,
					context: "creating new user at account activation",
					cause: "repository insert method",
				}
			);
		}
	} catch (err) {
		return next(err);
	}

	res.status(HTTPCodes.Success.CREATED).json({ message: "Account Created" });
}
