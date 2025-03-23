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

interface inputType {
  topic: string;
  field: string;
  lowestDifficulty: string;
  highestDifficulty: string;
  numberOfQuestion: string;
  studentGrade: string;
  questionLanguage: string;
  questionType: string;
}

export const getOutput = async ({
  topic,
  field,
  lowestDifficulty,
  highestDifficulty,
  numberOfQuestion,
  studentGrade,
  questionLanguage,
  questionType,
}: inputType) => {
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [
      {
        role: "system",
        content: `
          You are a highly skilled teacher assistant AI specializing in generating high-quality exam questions, following educational best practices and Bloom's Taxonomy.
          Bloom's Taxonomy consists of six cognitive levels:
          - C1 (Remembering): Recall of facts and basic concepts (e.g., define, list, memorize).
          - C2 (Understanding): Explain ideas or concepts (e.g., summarize, describe, interpret).
          - C3 (Applying): Use information in new situations (e.g., implement, execute, solve).
          - C4 (Analyzing): Draw connections among ideas (e.g., differentiate, organize, compare).
          - C5 (Evaluating): Justify a decision or course of action (e.g., assess, argue, critique).
          - C6 (Creating): Produce new or original work (e.g., design, construct, develop).
          When generating questions, ensure they align with the specified difficulty levels and include appropriate verbs and complexity as outlined in Bloom's Taxonomy.
          make sure Return the result as a valid JSON string with an array of objects no matter how much the object, where each object includes the fields: "question", "options" (if applicable and must have for "multiple choice" type, if there is no option return ['No Option']), "difficulty", "answer", and "explanation". 
        The JSON string should not contain line breaks or unnecessary whitespace formatting.
        Ensure the output is always a direct array of objects, not wrapped in another object like {'questions': [...]}.
        `,
      },
      {
        role: "user",
        content: `Generate ${numberOfQuestion} ${questionType} questions for the topic "${topic}" in the field of ${field}. 
        The questions should be suitable for ${studentGrade} grade level, written in ${questionLanguage}, and cover Bloom's Taxonomy difficulty levels ranging from ${lowestDifficulty} to ${highestDifficulty}. 
        Focus on creating questions that promote critical thinking, problem-solving, and real-world application. Where applicable, include context or scenarios to make the questions more engaging and challenging. 
      
        For "multiple choice" questions:
        - Provide exactly 4 answer options for elementary (1-6 grades) and junior high school (7-9 grades) levels .
        - Provide exactly 5 answer options for senior high school (10-12 grades) level.
        - Ensure no empty options and include only one correct answer per question.
        - Options should be well-constructed and avoid overly obvious or misleading choices.
        - Answer should be '0' if A, '1' if B, '2' if C, '3' if D, and '4' if E.
      
        When question is not multiple choise, give answer as list of text not string number:
          - True or False : 'Benar'
          - Essay : 'here is answer of question'
          - Sort Answer : 'here is answer of question' note:for Short answer question answer must be less then 50 character

        Return the result as a valid JSON string with an array of objects no matter how much the object, where each object includes the fields: "question", "options" (if applicable and must have for "multiple choice" type, if there is no option return ['No Option']), "difficulty", "answer", and "explanation". 
        The JSON string should not contain line breaks or unnecessary whitespace formatting.`,
      },
    ],
  });

  const hasil = completion.choices[0].message.content;

  try {
    const jsonObject = JSON.parse(hasil!);
    return jsonObject;
  } catch (error) {
    console.error("Invalid JSON string!", error);
  }
};
