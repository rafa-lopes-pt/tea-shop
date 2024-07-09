import { NextFunction, Request, Response } from "express";
import { SupportEmailSchemaType } from "../../../../../shared/schemas/SupportEmail.schema";

export default async function createSupportEmailMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { user, message } = req.body as SupportEmailSchemaType;

	res.locals.mail = {
		from: "Tea Shop Support <rafalopessecond@gmail.com>",
		to: "rafalopessecond+tea-shop@gmail.com",
		subject: "Support Ticket - " + user,

		html: `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0" />
			</head>
			<body>
				<a
					href="https://github.com/rafa-lopes-pt/tea-shop"
					target="_blank">
					<h2>Github</h2>
				</a>

				<h2>Message</h2>
				<p>${message}</p>
				<h3><a href="mailto:${user}">Reply</a></h3>
			</body>
		</html>
		`,
	};
	next();
}
