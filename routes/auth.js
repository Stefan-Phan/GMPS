import { Router } from "express";
import authController from "../controllers/auth.js";

const router = Router();
const { login, register, logout } = authController;

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
