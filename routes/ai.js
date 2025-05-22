import { Router } from "express";
import aiController from "../controllers/ai.js";

const router = Router();
const { getSymptonAdvice } = aiController;

router.post("/", getSymptonAdvice);

export default router;
