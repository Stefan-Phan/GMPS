import { StatusCodes } from "http-status-codes";
import qaLog from "../models/qaLog.js";
import { getSmartHealthAdvice } from "../utils/getSmartHealthAdvice.js";

const getSymptonAdvice = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please provide a symptom-related question." });
  }

  try {
    const { answer, fromCache } = await getSmartHealthAdvice(question);
    return res.status(200).json({ answer, fromCache });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get AI response" });
  }
};

const getRecentAIQuestions = async (req, res) => {
  const recentLogs = await qaLog.find({}).sort({ createdAt: -1 }).limit(5);

  return res
    .status(StatusCodes.OK)
    .json({ count: recentLogs.length, recentLogs });
};

export default { getSymptonAdvice, getRecentAIQuestions };
