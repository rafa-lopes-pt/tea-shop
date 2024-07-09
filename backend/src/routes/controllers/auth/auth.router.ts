import express from "express";
import { LoginSchema } from "../../../../../shared/schemas/login.schema";
import { SignupSchema } from "../../../../../shared/schemas/signup.schema";
import createBodyValidatorMiddleware from "../../middleware/createBodyValidator.middleware";
import loginController from "./login.controller";
import logoutController from "./logout.controller";
import signupController from "./signup.controller";
import activateController from "./activate.controller";
import sendMailController from "../../../mail/controllers/sendMail.controller";
import createActivationLinkEmailMiddleware from "../../../mail/middleware/templates/createActivationLinkEmail.middleware";
import { sendMailMiddleware } from "../../../mail/mail.router";

const router = express.Router();

router.post(
	"/signup",
	createBodyValidatorMiddleware(SignupSchema),
	signupController,
	...sendMailMiddleware(createActivationLinkEmailMiddleware)
);

router.get("/activate/:token", activateController);

router.post(
	"/login",
	createBodyValidatorMiddleware(LoginSchema),
	loginController
);
router.get("/logout", logoutController);

export default router;
