import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const getHealthAdvice = async (userInput) => {
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-4-maverick:free",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful medical assistant. Provide symptom advice, emotional support, and safe prescription guidance. Do not make medical diagnoses.",
      },
      {
        role: "user",
        content: userInput,
      },
    ],
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
};

getHealthAdvice("I have a headache");
