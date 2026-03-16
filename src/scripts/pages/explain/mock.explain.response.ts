export function mockExplainResponse(isCorrect: boolean): string {
  if (!isCorrect) {
    return "The correct answer is: <a>. The <a> tag is used to create hyperlinks. Your answer is incorrect because <link> is used to connect resources, not to create links.";
  }

  return "Mini-practice: Write HTML code that creates a link to Google and opens it in a new tab.";
}