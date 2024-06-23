import express from "express";
//sub routers
import authRouter from "./controllers/auth/auth.router";
import shopRouter from "./controllers/shop/shop.router";
import accountRouter from "./controllers/account/account.router";

//
const router = express.Router();

router.use(authRouter);
router.use(shopRouter);
router.use(accountRouter);

export default router;
