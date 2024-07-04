import { NextFunction, Request, Response } from "express";

export default async function createActivationLinkEmail(
	req: Request,
	res: Response,
	next: NextFunction
) {
	//url -> send-activation-link/:email?token=
	const email = req.params.email;
	const token = req.query.token;

	res.locals.mail = {
		from: "Rafael Lopes <rafalopessecond@gmail.com>",
		to: email,
		subject: "Activate your Tea-Shop Account!",
		text: `yay it works! :)\n\n use this link to activate!\n\n http://localhost:5173/activate/${token}`,
		// html
	};
	next();
}
