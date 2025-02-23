"use server";

import OpenAi from "openai";
import { date } from "zod";

const AI_KEY = process.env.OPENROUTER_API_KEY;

const openai = new OpenAi({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: `${AI_KEY}`,
  defaultHeaders: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AI_KEY}`,
  },
});

const inputParameters = {
  topic: ["world war 2"],
  field: "history",
  difficultyMin: "C2",
  difficultyMax: "C6",
  questionCount: 10,
  gradeLevel: "Grade 8",
  language: "English",
  questionType: "Multiple Choice",
};

export const getOutput = async () => {
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [
      {
        role: "system",
        content: `You are an automatic question generator for the field of ${
          inputParameters.field
        }.
Generate ${inputParameters.questionCount} ${
          inputParameters.questionType
        } questions 
on the topics of ${inputParameters.topic.join(", ")}.
The questions should be suitable for ${inputParameters.gradeLevel} students 
and written in ${inputParameters.language}.
Ensure the questions vary in difficulty from ${
          inputParameters.difficultyMin
        } to ${inputParameters.difficultyMax}.

Provide the output as a **JSON array of objects**, following this strict format:
[
  {
    "question": "The question text",
    "difficulty": "C2",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "The correct answer",
    "explanation": "A detailed explanation of the answer"
  }
]

Important Formatting Rules:
1. Ensure all strings are enclosed in **double quotes ("")**, not single quotes ('').
2. Escape any special characters properly (e.g., \\", \\n, \\\\).
3. Avoid trailing commas and ensure proper array and object closures ([] and {}).
4. Double-check that the output is a **valid JSON** and can be safely parsed without errors.
5. The entire output should fit **within a single array** to avoid issues when parsed.

The output must be a valid JSON array that can be safely parsed with JSON.parse().`,
      },
    ],
  });

  console.log({ completion });
  const hasil = completion.choices[0].message.content;
  console.log(hasil);
  const match = hasil?.match(/\[(.*)\]/s);
  try {
    if (match) {
      const data = JSON.parse(match[1]);
      console.log("JSON Valid:", data);
    }
    return date;
  } catch (error) {
    console.error("JSON Parsing Error:", error);
  }
};
