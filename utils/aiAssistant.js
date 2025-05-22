import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:
    "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",
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

  return completion.choices[0].message.content;
};
