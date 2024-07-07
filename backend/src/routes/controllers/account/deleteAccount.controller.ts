import { NextFunction, Request, Response } from "express";
import UserRepository from "../../../repositories/User.repository";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
import HTTPCodes from "simple-http-codes";
import OrdersRepository from "../../../repositories/Orders.repository";

export default async function deleteAccountController(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		//Check if its possible to delete account
		const orders_response = await OrdersRepository.has({
			email: res.locals.email,
			delivered: true,
		});

		if (orders_response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				orders_response.message,
				{
					error: orders_response.error,
					context: "checking if account has ongoing orders",
				}
			);
		}

		if (orders_response.data) {
			return res
				.status(HTTPCodes.ClientError.CONFLICT)
				.json({ message: "Can´t delete account with ongoing orders" });
		}

		//delete account
		const db_response = await UserRepository.delete({
			email: res.locals.email,
		});

		if (db_response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				db_response.message,
				{
					error: db_response.error,
					context: "deleting account",
				}
			);
		}

		next();
	} catch (error) {
		next(error);
	}
}
