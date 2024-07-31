import express from "express";
import authMiddleware from "../../middleware/auth.middleware";
import placeOrderController from "./placeOrder.controller";
import getOrdersController from "./getOrders.controller";
import markOrdersAsDeliveredController from "./markAllAsShipped";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getOrdersController);
router.post("/", placeOrderController);

//TODO: stripe js webhook to update the orders after payment received

//STAGE 0 ONLY
router.get("/dev/markAllOrdersAsShipped", markOrdersAsDeliveredController);
//
export default router;
