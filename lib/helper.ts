type QuestionParams = {
  numberOfQuestions: number;
  questionType: string;
  language: string;
  educationLevel: string;
  topic: string;
};

export function generateQuestionPrompt({
  numberOfQuestions,
  questionType,
  language,
  educationLevel,
  topic,
}: QuestionParams): string {
  return `Create ${numberOfQuestions} ${questionType} questions in ${language} for students at the ${educationLevel} level on the topic of ${topic}. I want the questions to have varying difficulty levels based on Bloom's Taxonomy, with the AI expected to evenly distribute the proportion of questions from C2 to C6. Each question should include an answer and an explanation, displayed at the bottom, separate from the questions. Output format: [Question], [Answer Choices if needed], [Answer and Explanation at the bottom].`;
}

type Question = {
  question: string;
  options: string[];
  difficulty: string;
  answer: string;
  explanation: string;
};

export const getQuestionText = (questions: Question[]): string => {
  return questions
    .map(
      ({ question, options, answer, explanation }, index) => `
          <p>
              <strong>${index + 1}. ${question}</strong><br />
              ${options
                .map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`)
                .join("<br />")}
              <br /><br />
              <strong>Answer:</strong> <b>${answer}</b><br />
              <strong>Explanation:</strong> <b>${explanation}</b>
          </p>
      `
    )
    .join("");
};
