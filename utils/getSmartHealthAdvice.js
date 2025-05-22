import qaLog from "../models/qaLog.js";
import { getHealthAdvice } from "./aiAssistant.js";

export const getSmartHealthAdvice = async (question) => {
  const normalized = question.trim().toLowerCase();

  // Get answer from database
  const cached = await qaLog.findOne({ normalizedQuestion: normalized });
  if (cached) {
    return { answer: cached.answer, fromCache: true };
  }

  // Get new answer from OpenAI
  const answer = await getHealthAdvice(question);

  // Save questions and answer to database for caching
  await qaLog.create({
    question,
    normalizedQuestion: normalized,
    answer,
  });

  return { answer, fromCache: false };
};
