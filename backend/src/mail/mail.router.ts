import express from "express";
import session from "express-session";
import oauth2callbackController from "./controllers/oauth2callback.controller";
import renewRefreshTokenController from "./controllers/renewRefreshToken.controller";
import sendMailController from "./controllers/sendMail.controller";
import createOauthClientMiddleware from "./middleware/createOauthClient.middleware";
import createActivationLinkEmail from "./middleware/templates/createActivationLinkEmail.middleware";
import HTTPCodes from "simple-http-codes";
import HttpError from "../../../shared/types/HttpError/HttpError.type";

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
router.get(
	"/send-activation-link/:email",
	createActivationLinkEmail,
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
