import { StatusCodes } from "http-status-codes";
import { getSmartHealthAdvice } from "../utils/getSmartHealthAdvice.js";
import { getHealthAdvice } from "../utils/aiAssistant.js";

const getSymptonAdvice = async (req, res) => {
  const { question } = req.body;
  // const userId = req.body;

  if (!question) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please provide a symptom-related question." });
  }

  try {
    // const { answer, fromCache } = await getSmartHealthAdvice(userId, question);
    const { answer } = await getHealthAdvice(question);
    // return res.status(200).json({ answer, fromCache });
    return res.status(200).json({ answer });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get AI response" });
  }
};

export default { getSymptonAdvice };
