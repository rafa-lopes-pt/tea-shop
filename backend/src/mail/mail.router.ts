import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import HTTPCodes from "simple-http-codes";
import { SupportEmailSchema } from "../../../shared/schemas/support-email.schema";
import HttpError from "../../../shared/types/HttpError/HttpError.type";
import createBodyValidatorMiddleware from "../routes/middleware/createBodyValidator.middleware";
import oauth2callbackController from "./controllers/oauth2callback.controller";
import renewRefreshTokenController from "./controllers/renewRefreshToken.controller";
import sendMailController from "./controllers/sendMail.controller";
import createOauthClientMiddleware from "./middleware/createOauthClient.middleware";
import createSupportEmailMiddleware from "./middleware/templates/createSupportEmail.middleware";
const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
	throw new HttpError(
		HTTPCodes.ServerError.SERVICE_UNAVAILABLE,
		"missing SESSION_SECRET env variable"
	);
}

const router = express.Router();

//defines credentials and an oAuthClient in the res.locals
router.use(createOauthClientMiddleware);
export const sendMailMiddleware = (
	createTemplate: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>
) => [createOauthClientMiddleware, createTemplate, sendMailController];
router.post(
	"/email-support",
	createBodyValidatorMiddleware(SupportEmailSchema),
	createSupportEmailMiddleware,
	sendMailController
);
/*
  Protect agains CSRF attacks
 */
router.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
/*
  Renew the oauth2 refresh token
  GCP is configured to only allow my email, so if anyone else tries to
  renew the token with another account (disrupting the service), it won't work
 */
router.get("/renew", renewRefreshTokenController);
router.get("/oauth2", oauth2callbackController);

export default router;
