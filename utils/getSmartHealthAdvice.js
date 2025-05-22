import qaLog from "../models/qaLog.js";
import { getHealthAdvice } from "./aiAssistant.js";

export const getSmartHealthAdvice = async (question) => {
  const normalized = question.trim().toLowerCase();

  console.log("1");
  const cached = await qaLog.findOne({ normalizedQuestion: normalized });
  if (cached) {
    return { answer: cached.answer, fromCache: true };
  }
  console.log("2");
  // Get new answer from OpenAI
  const answer = await getHealthAdvice(question);
  console.log("3");

  await qaLog.create({
    question,
    normalizedQuestion: normalized,
    answer,
  });

  console.log("4");

  return { answer, fromCache: false };
};
