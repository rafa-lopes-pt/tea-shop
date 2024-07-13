import express from "express";
import authMiddleware from "../../middleware/auth.middleware";
import placeOrderController from "./placeOrder.controller";
import getOrdersController from "./getOrders.controller";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getOrdersController);
router.post("/", placeOrderController);

//TODO: stripe js webhook to update the orders after payment received

export default router;
