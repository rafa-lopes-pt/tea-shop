import { NextFunction, Request, Response } from "express";
import UserRepository from "../../../repositories/User.repository";
import HttpError from "../../../utils/HttpError";

export default async function deleteAccountController(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const db_response = await UserRepository.delete({
			email: res.locals.email,
		});

		if (db_response.error) {
			throw new HttpError("BAD_GATEWAY", db_response.message, {
				error: db_response.error,
				context: "deleting account",
			});
		}

		next();
	} catch (error) {
		next(error);
	}
}
