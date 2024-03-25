"use server";

export async function answerQuestion(answer: string): Promise<Q_Answer> {
  if (!process.env.COOKIE) throw new Error("No .env or COOKIE is blank");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: process.env.COOKIE,
    },
    body: JSON.stringify({ answer: answer, score: 99 }),
  };

  const serverReply = await fetch(
    "https://quiz.q-meieriene.no/api/app/quiz/check-answer",
    options
  );
  const answerJSON: Q_Answer = await serverReply.json();
  console.log("Cookie: ", process.env.COOKIE);
  return answerJSON;
}
