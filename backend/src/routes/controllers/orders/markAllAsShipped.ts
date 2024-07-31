import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
import { OrderState } from "../../../../../shared/schemas/order.schema";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
import OrdersRepository from "../../../repositories/Orders.repository";
export default async function markOrdersAsDeliveredController(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	const { email } = res.locals;

	try {
		const db_response = await OrdersRepository.updateMany(
			{ email },
			{ $set: { state: OrderState.DELIVERED } }
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

		return res.status(HTTPCodes.Success.OK).json({
			data: db_response.data ? "Orders Delivered" : "Nothing was changed",
		});
	} catch (error) {
		next(error);
	}
}
