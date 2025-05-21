import { Router } from "express";
const router = Router();

import authController from "../controllers/auth.js";
const { login, register, logout } = authController;

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
