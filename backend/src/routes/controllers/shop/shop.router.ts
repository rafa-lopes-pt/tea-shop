import express from "express";
import products from "./initial-products.json";

const router = express.Router();

router.get("/shop", (_, res) => {
	res.status(200).json({ products });
});

export default router;
