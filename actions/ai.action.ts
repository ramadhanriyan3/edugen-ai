"use server";

import OpenAi from "openai";

const AI_KEY = process.env.OPENROUTER_API_KEY;

const openai = new OpenAi({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: `${AI_KEY}`,
  defaultHeaders: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AI_KEY}`,
  },
});

export const getOutput = async (content: string) => {
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [{ role: "user", content: `${content}` }],
  });

  console.log({ completion });
  const hasil = completion.choices[0].message;
  return hasil;
};
