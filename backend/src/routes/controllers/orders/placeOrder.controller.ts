import { NextFunction, Request, Response } from "express";
import OrdersRepository from "../../../repositories/Orders.repository";
import { OrderSchemaType } from "../../../../../shared/schemas/order.schema";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";
import HTTPCodes from "simple-http-codes";
export default async function placeOrderController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const order = req.body as OrderSchemaType;
	try {
		const db_response = await OrdersRepository.insert(order);
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
			return res.status(HTTPCodes.Success.CREATED).end();
		}
	} catch (error) {
		next(error);
	}
}
