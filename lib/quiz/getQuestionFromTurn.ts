"use server";

export async function getQuestionFromTurn(
  turn: number
): Promise<QuizQuestion | null> {
  if (!process.env.COOKIE) throw new Error("No .env");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: process.env.COOKIE,
    },
    body: JSON.stringify({ turn: turn }),
  };

  const question = await fetch(
    "https://quiz.q-meieriene.no/api/app/quiz/pick-question",
    options
  );
  try {
    const questionJSON: QuizQuestion = await question.json();
    return questionJSON;
  } catch (e) {
    console.error("Error getting JSON: ", question.text());
    return null;
  }
}
