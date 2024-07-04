import express from "express";
import session from "express-session";
import oauth2callbackController from "./controllers/oauth2callback.controller";
import renewRefreshTokenController from "./controllers/renewRefreshToken.controller";
import sendMailController from "./controllers/sendMail.controller";
import createOauthClientMiddleware from "./middleware/createOauthClient.middleware";

const router = express.Router();

//defines credentials and an oAuthClient in the res.locals
router.use(createOauthClientMiddleware);
router.get("/send/:email", sendMailController);
/*
  Protect agains CSRF attacks
 */
router.use(
	session({
		secret: "your_secure_secret_key",
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
