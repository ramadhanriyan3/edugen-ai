type Question = {
  question: string;
  options: string[];
  difficulty: string;
  answer: string;
  explanation: string;
};
export const getQuestionMarkdown = (questions: Question[]) => {
  return questions
    .map(({ question, options, answer, explanation, difficulty }, index) => {
      const answerText = !isNaN(parseInt(answer))
        ? `${String.fromCharCode(65 + parseInt(answer))}`
        : answer;

      const optionsText =
        options.length > 1
          ? options
              .map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`)
              .join("\n")
          : "\n";

      return `**${
        index + 1
      }. ${question}**\n${optionsText}\n\n**Difficulty:** ${difficulty}\n**Answer:** ${answerText}\n**Explanation:** ${explanation}\n\n`;
    })
    .join(``);
};
