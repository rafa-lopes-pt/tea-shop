import express, { NextFunction, Request, Response } from "express";
import mailRouter from "../mail/mail.router";
import accountRouter from "./controllers/account/account.router";
import authRouter from "./controllers/auth/auth.router";
import mediaController from "./controllers/misc/media.controller";
import shopRouter from "./controllers/shop/shop.router";
import authMiddleware from "./middleware/auth.middleware";
import imageOwnerAuthMiddleware from "./middleware/imageOwnerAuth.middleware";
import ordersRouter from "./controllers/orders/orders.router";
import HTTPCodes from "simple-http-codes";

const router = express.Router();

router.get("/health", (_, res) => {
	res.status(HTTPCodes.ClientError.IM_A_TEAPOT).json({
		data: "Server is running, but refused to brew coffee with a teapot",
	});
});

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

router.all("*", (_, res) =>
	res.status(404).json({ data: "Endpoint Not Implemented" })
);

export default router;
