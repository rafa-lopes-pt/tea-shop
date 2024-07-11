import express from "express";
import { UpdateProfileSchema } from "../../../../../shared/schemas/UpdateProfile.schema";
import authMiddleware from "../../middleware/auth.middleware";
import createBodyValidatorMiddleware from "../../middleware/createBodyValidator.middleware";
import logoutController from "../auth/logout.controller";
import deleteAccountController from "./deleteAccount.controller";
import updateProfileImageMiddleware from "./updateProfileImage.middleware";
import updateProfileController from "./updateProfile.controller";
import multer from "multer";
const router = express.Router();

router.use(authMiddleware);

router.patch(
	"/",
	createBodyValidatorMiddleware(UpdateProfileSchema),
	updateProfileController
);

router.put("/image", updateProfileImageMiddleware, updateProfileController);

router.delete("/", deleteAccountController, logoutController);

export default router;
