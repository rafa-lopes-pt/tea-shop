import express from "express";
import authMiddleware from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/test", authMiddleware, (_, res) => {
	res.status(200).json();
});

export default router;
