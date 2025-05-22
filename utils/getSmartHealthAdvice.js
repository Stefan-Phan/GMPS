import qaLog from "../models/qaLog.js";
import { getHealthAdvice } from "./aiAssistant.js";

export const getSmartHealthAdvice = async (userId, question) => {
  const normalized = question.trim().toLowerCase();

  const cached = await qaLog.findOne({ normalizedQuestion: normalized });
  if (cached) {
    return { answer: cached.answer, fromCache: true };
  }

  // Get new answer from OpenAI
  const answer = await getHealthAdvice(question);

  console.log("Hey");

  // Save to DB for future reuse
  await qaLog.create({
    userId,
    question,
    normalizedQuestion: normalized,
    answer,
  });

  return { answer, fromCache: false };
};
