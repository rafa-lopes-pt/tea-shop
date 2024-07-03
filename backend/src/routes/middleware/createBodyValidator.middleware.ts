import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import HttpError from "../../utils/HttpError";
import HTTPCodes from "simple-http-codes";

export default function createBodyValidatorMiddleware(schema: z.ZodSchema) {
	return (req: Request, _res: Response, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body);

			return next();
		} catch (error) {
			throw new HttpError(
				HTTPCodes.ClientError.BAD_REQUEST,
				"missing or invalid fields at " + req.url,
				{
					error: (error as ZodError).errors,
				}
			);
		}
	};
}
