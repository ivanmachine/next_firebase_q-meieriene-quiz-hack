"use server";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Cookie: process.env.COOKIE ?? "blank",
  },
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",

  Origin: "https://quiz.q-meieriene.no",
  body: '{"answer":"__wrong_answer__","score":90}',
};
export async function getAnswerFromAPI(): Promise<Q_Answer> {
  if (options.headers.Cookie === "blank") throw new Error("No .env");

  const answerFromAPI = await fetch(
    "https://quiz.q-meieriene.no/api/app/quiz/check-answer",
    options
  );
  const asnwerJSON = await answerFromAPI.json();
  return asnwerJSON;
}
