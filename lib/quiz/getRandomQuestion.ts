"use server";

export async function getRandomQuestion(turn: number): Promise<QuizQuestion> {
  if (!process.env.COOKIE) throw new Error("No .env");
  const options = {
    method: "POST",
    headers: {
      Origin: "https://quiz.q-meieriene.no",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
      "Content-Type": "application/json",
      Cookie: process.env.COOKIE ?? "blank",
    },
    body: JSON.stringify({ turn: turn }),
  };

  const randomQuestion = await fetch(
    "https://quiz.q-meieriene.no/api/app/quiz/pick-question",
    options
  ).catch((err) => console.error(err));
  const randomQuestionJSON = await randomQuestion?.json();
  return randomQuestionJSON;
}
