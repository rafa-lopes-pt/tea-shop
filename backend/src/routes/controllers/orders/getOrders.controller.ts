import { NextFunction, Request, Response } from "express";
import OrdersRepository from "../../../repositories/Orders.repository";
import { OrderSchemaType } from "../../../../../shared/schemas/order.schema";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
import HTTPCodes from "simple-http-codes";
export default async function getOrdersController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { email } = res.locals;
	try {
		const db_response = await OrdersRepository.find({ email });
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
			const orders = await db_response.data.toArray();
			return res.status(HTTPCodes.Success.OK).json({ data: orders });
		}
	} catch (error) {
		next(error);
	}
}
