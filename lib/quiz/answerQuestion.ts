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
  body: "",
};

export async function answerQuestion(answer: string): Promise<Q_Answer> {
  if (options.headers.Cookie === "blank") throw new Error("No .env");
  options.body = JSON.stringify({ answer: answer, score: 100 });
  const serverReply = await fetch(
    "https://quiz.q-meieriene.no/api/app/quiz/check-answer",
    options
  );
  const answerJSON: Q_Answer = await serverReply.json();
  return answerJSON;
}
