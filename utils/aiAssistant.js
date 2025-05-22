import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getHealthAdvice = async (userInput) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a compassionate medical assistant. A patient says:
"${userInput}"

Give clear and safe advice they can follow at home before seeing a doctor.
Focus on hydration, rest, and reassurance. Do NOT give a diagnosis.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;
  } catch (error) {
    throw error;
  }
};
