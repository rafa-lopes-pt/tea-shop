import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
import UserRepository from "../../../repositories/User.repository";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
import { UpdateProfileSchemaType } from "../../../../../shared/schemas/update-profile.schema";
export default async function updateProfileController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	//dataToUpdate is guaranteed to have at least 1 field defined
	const dataToUpdate = req.body as UpdateProfileSchemaType;

	try {
		const db_response = await UserRepository.update(
			{ email: res.locals.email },
			dataToUpdate
		);

		if (db_response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				db_response.message,
				{
					error: db_response.error,
					context: "updating user profile info",
					cause: "repository update method",
				}
			);
		}

		if (db_response.data) {
			const { _id: _id, password: _password, ...user } = db_response.data;
			return res.status(HTTPCodes.Success.OK).json({ data: user });
		}
	} catch (error) {
		next(error);
	}
}
