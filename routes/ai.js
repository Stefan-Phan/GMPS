import { Router } from "express";
import aiController from "../controllers/ai.js";

const router = Router();
const { getSymptonAdvice, getRecentAIQuestions } = aiController;

router.get("/", getRecentAIQuestions).post("/", getSymptonAdvice);

export default router;
