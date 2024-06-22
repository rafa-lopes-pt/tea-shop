import express from "express";
import { LoginSchema } from "../../../../../shared/schemas/login.schema";
import { SignupSchema } from "../../../../../shared/schemas/signup.schema";
import dbClient from "../../../database/DatabaseClient";
import AuthRepository from "../../../repositories/Auth.repository";
import createBodyValidatorMiddleware from "../../middleware/createBodyValidator.middleware";
import loginController from "./login.controller";
import signupController from "./signup.controller";
import logoutController from "./logout.controller";

const router = express.Router();

export const authRepo = new AuthRepository(dbClient);

router.post(
	"/signup",
	createBodyValidatorMiddleware(SignupSchema),
	signupController
);

router.post(
	"/login",
	createBodyValidatorMiddleware(LoginSchema),
	loginController
);
router.get("/logout", logoutController);

export default router;
