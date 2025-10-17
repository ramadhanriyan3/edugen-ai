export function createOptimizedPrompt(
  userPrompt: string,
  fileContent: string
): string {
  const truncatedFileContent =
    fileContent.length > 20000
      ? fileContent.substring(0, 20000) + "\n[Content truncated for brevity]"
      : fileContent;

  const fileContext = fileContent
    ? `Reference Material:\n${truncatedFileContent}`
    : "";

  return `You are an expert content creator. Write engaging and logically structured content in clean semantic HTML using <p>, <ul>, <ol>, <strong>, and <em> where appropriate. Do not use heading tags (<h1>, <h2>, etc). Keep the tone natural and professional. The output will be inserted directly into a rich text editor, so it must be well-formatted and easy to read. Avoid markdown, explanations, or meta text—return only the HTML content itself.\n\n${
    fileContext ? fileContext + "\n\n" : ""
  }User Request:\n${userPrompt}\n\nGenerate the final HTML content based on the user's request and the reference material if provided.`;
}
