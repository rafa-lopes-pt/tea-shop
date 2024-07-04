import express from "express";
import authMiddleware from "../../middleware/auth.middleware";
import createBodyValidatorMiddleware from "../../middleware/createBodyValidator.middleware";
import UpdateProfileSchema from "./UpdateProfile.schema";
import updateProfileController from "./updateProfile.controller";
import deleteAccountController from "./deleteAccount.controller";
import logoutController from "../auth/logout.controller";

const router = express.Router();

router.use(authMiddleware);

router.patch(
	"/",
	createBodyValidatorMiddleware(UpdateProfileSchema),
	updateProfileController
);

router.delete("/", deleteAccountController, logoutController);

export default router;
