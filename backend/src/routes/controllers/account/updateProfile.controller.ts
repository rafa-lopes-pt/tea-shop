import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
import UserRepository from "../../../repositories/User.repository";
import HttpError from "../../../utils/HttpError";
import { UpdateProfileSchemaType } from "./UpdateProfile.schema";

export default async function updateProfileController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const dataToUpdate = req.body as UpdateProfileSchemaType;

	if (!dataToUpdate) {
		return res
			.status(HTTPCodes.ClientError.BAD_REQUEST)
			.json({ message: "missing fields to update" });
	}

	try {
		const db_response = await UserRepository.update(
			{ email: res.locals.email },
			dataToUpdate
		);

		if (db_response.error) {
			throw new HttpError("BAD_GATEWAY", db_response.message, {
				error: db_response.error,
				context: "updating user profile info",
				cause: "repository update method",
			});
		}

		if (db_response.data) {
			const { _id: _id, password: _password, ...user } = db_response.data;
			return res.status(HTTPCodes.Success.OK).json({ user });
		}
	} catch (error) {
		next(error);
	}
}
