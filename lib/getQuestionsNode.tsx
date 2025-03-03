type Question = {
  question: string;
  options: string[];
  difficulty: string;
  answer: string;
  explanation: string;
};

export const getQuestionNode = (questions: Question[]) => {
  return (
    <div className="bg-white/70 rounded-md p-2 drop-shadow-sm flex flex-col gap-y-4">
      {questions.map(
        ({ question, options, answer, explanation, difficulty }, index) => (
          <div key={index} className="flex flex-col gap-y-3">
            <strong>
              {index + 1}. {question}
            </strong>
            <div className="flex flex-col gap-y-2">
              {options.map((opt, i) => (
                <p key={i}>
                  {String.fromCharCode(65 + i)}. {opt}
                </p>
              ))}
            </div>
            <strong>Difficulty: {difficulty} </strong>

            <p>
              <strong>Answer: </strong>
              {answer}
            </p>
            <p>
              <strong>Explanation: </strong> {explanation}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export const getQuestionMarkdown = (questions: Question[]) => {
  return questions
    .map(({ question, options, answer, explanation, difficulty }, index) => {
      const answerText = !isNaN(parseInt(answer))
        ? `${String.fromCharCode(65 + parseInt(answer))}`
        : answer;

      return `**${index + 1}. ${question}**  
${
  options.length > 1
    ? options
        .map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`)
        .join("\n")
    : ""
}  
**Difficulty:** ${difficulty}  
**Answer:** ${answerText}  
**Explanation:** ${explanation}`;
    })
    .join("\n\n");
};
