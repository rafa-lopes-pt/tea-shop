import express from "express";
import { LoginSchema } from "../../../../../shared/schemas/login.schema";
import { SignupSchema } from "../../../../../shared/schemas/signup.schema";
import { sendMailMiddleware } from "../../../mail/mail.router";
import createActivationLinkEmailMiddleware from "../../../mail/middleware/templates/createActivationLinkEmail.middleware";
import createBodyValidatorMiddleware from "../../middleware/createBodyValidator.middleware";
import activateController from "./activate.controller";
import loginController from "./login.controller";
import logoutController from "./logout.controller";
import signupController from "./signup.controller";

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
