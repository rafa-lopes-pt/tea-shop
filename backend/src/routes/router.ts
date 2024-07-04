import express from "express";
//sub routers
import authRouter from "./controllers/auth/auth.router";
import shopRouter from "./controllers/shop/shop.router";
import accountRouter from "./controllers/account/account.router";
//
const router = express.Router();
//dev only
import mailRouter from "../mail/mail.router";
//
router.use(authRouter);
router.use("/shop", shopRouter);
router.use("/profile", accountRouter);
router.use(mailRouter);

export default router;
