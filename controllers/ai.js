import { StatusCodes } from "http-status-codes";
import { getHealthAdvice } from "../utils/aiAssistant.js";

const getSymptonAdvice = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please provide a symptom-related question." });
  }

  try {
    const answer = await getHealthAdvice(question);
    return res.status(StatusCodes.OK).json({ response: answer });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get AI response" });
  }
};

export default { getSymptonAdvice };
