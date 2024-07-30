import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
import { OrderState } from "../../../../../shared/schemas/order.schema";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
import OrdersRepository from "../../../repositories/Orders.repository";
export default async function markOrdersAsDeliveredController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { email } = res.locals;
	try {
		const db_response = await OrdersRepository.updateMany(
			{ email: "rafalopessecond@gmail.com" },
			{ $set: { state: "delivered" as OrderState.DELIVERED } }
		);

		if (db_response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				db_response.message,
				{
					error: db_response.error,
				}
			);
		}

		if (db_response.data) {
			return res.status(HTTPCodes.Success.NO_CONTENT).end();
		}
	} catch (error) {
		next(error);
	}
}