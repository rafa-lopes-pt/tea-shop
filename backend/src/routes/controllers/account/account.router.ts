import express from "express";
import authMiddleware from "../../middleware/auth.middleware";
import createBodyValidatorMiddleware from "../../middleware/createBodyValidator.middleware";
import UpdateProfileSchema from "./UpdateProfile.schema";
import updateProfileController from "./updateProfile.controller";

const router = express.Router();

router.use(authMiddleware);

router.put(
	"/profile",
	createBodyValidatorMiddleware(UpdateProfileSchema),
	updateProfileController
);

export default router;
