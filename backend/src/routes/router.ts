import express from "express";
import HTTPCodes from "simple-http-codes";
import mailRouter from "../mail/mail.router";
import accountRouter from "./controllers/account/account.router";
import authRouter from "./controllers/auth/auth.router";
import mediaController from "./controllers/misc/media.controller";
import markOrdersAsDeliveredController from "./controllers/orders/markAllAsShipped";
import ordersRouter from "./controllers/orders/orders.router";
import shopRouter from "./controllers/shop/shop.router";
import authMiddleware from "./middleware/auth.middleware";
import imageOwnerAuthMiddleware from "./middleware/imageOwnerAuth.middleware";

const router = express.Router();

router.get("/health", (_, res) => {
	// res.status(HTTPCodes.ClientError.IM_A_TEAPOT)
	res.status(HTTPCodes.Success.OK).json({
		data: "418 - Server is running, but refused to brew coffee with a teapot",
	});
});

router.use(authRouter);
router.use("/shop", shopRouter);
router.use("/profile", accountRouter);
router.use("/orders", ordersRouter);
router.use("/mail", mailRouter);
//resource access
router.get(
	"/resources/profile-images/:resource",
	authMiddleware,
	imageOwnerAuthMiddleware,
	mediaController
);
router.get("/resources/product-images/:resource", mediaController);

router.all("*", (_, res) =>
	res.status(404).json({ data: "Endpoint Not Implemented" })
);

export default router;
