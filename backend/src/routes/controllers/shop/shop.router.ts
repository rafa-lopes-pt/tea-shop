import express from "express";
import listShopItemsController from "./listShopItems.controller";

const router = express.Router();

router.get("/", listShopItemsController);

export default router;
