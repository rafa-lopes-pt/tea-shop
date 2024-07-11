import express from "express";
//sub routers
import authRouter from "./controllers/auth/auth.router";
import shopRouter from "./controllers/shop/shop.router";
import accountRouter from "./controllers/account/account.router";
import mailRouter from "../mail/mail.router";
import mediaController from "./controllers/misc/media.controller";
import authMiddleware from "./middleware/auth.middleware";
import imageOwnerAuthMiddleware from "./middleware/imageOwnerAuth.middleware";
//
const router = express.Router();
router.use(authRouter);
router.use("/shop", shopRouter);
router.use("/profile", accountRouter);
router.use(mailRouter);

//resource access
router.get(
	"/resources/profile-images/:resource",
	authMiddleware,
	imageOwnerAuthMiddleware,
	mediaController
);

export default router;
