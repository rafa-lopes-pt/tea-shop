import { Request, Response } from "express";
import HTTPCodes from "simple-http-codes";

export default async function logoutController(_req: Request, res: Response) {
	res.cookie("auth_token", "", {
		httpOnly: true,
		secure: false,
		sameSite: "strict",
	});

	res.status(HTTPCodes.Success.NO_CONTENT).end();
}
