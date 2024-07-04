import express from "express";
import { LoginSchema } from "../../../../../shared/schemas/login.schema";
import { SignupSchema } from "../../../../../shared/schemas/signup.schema";
import createBodyValidatorMiddleware from "../../middleware/createBodyValidator.middleware";
import loginController from "./login.controller";
import logoutController from "./logout.controller";
import signupController from "./signup.controller";
import activateController from "./activate.controller";

const router = express.Router();

router.post(
	"/signup",
	createBodyValidatorMiddleware(SignupSchema),
	signupController
);

router.get("/activate/:token", activateController);

router.post(
	"/login",
	createBodyValidatorMiddleware(LoginSchema),
	loginController
);
router.get("/logout", logoutController);

export default router;
