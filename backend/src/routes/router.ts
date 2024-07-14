import express from "express";
import mailRouter from "../mail/mail.router";
import accountRouter from "./controllers/account/account.router";
import authRouter from "./controllers/auth/auth.router";
import mediaController from "./controllers/misc/media.controller";
import shopRouter from "./controllers/shop/shop.router";
import authMiddleware from "./middleware/auth.middleware";
import imageOwnerAuthMiddleware from "./middleware/imageOwnerAuth.middleware";
import ordersRouter from "./controllers/orders/orders.router";

const router = express.Router();
router.use(authRouter);
router.use("/shop", shopRouter);
router.use("/profile", accountRouter);
router.use("/orders", ordersRouter);
router.use(mailRouter);
//resource access
router.get(
	"/resources/profile-images/:resource",
	authMiddleware,
	imageOwnerAuthMiddleware,
	mediaController
);

export default router;
