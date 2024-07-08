import { NextFunction, Request, Response } from "express";
import HTTPCodes from "simple-http-codes";
import ShopRepository from "../../../repositories/Shop.repository";
import HttpError from "../../../../../shared/types/HttpError/HttpError.type";

export default async function listShopItemsController(
	_req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const response = await ShopRepository.find({});

		if (response.error) {
			throw new HttpError(
				HTTPCodes.ServerError.BAD_GATEWAY,
				response.message,
				{
					error: response.error,
					context: "getting all shop items",
				}
			);
		}

		const items = await response.data?.toArray();
		await ShopRepository.closeConnections();
		return res.status(HTTPCodes.Success.OK).json({ data: items });
	} catch (err) {
		return next(err);
	}
}
