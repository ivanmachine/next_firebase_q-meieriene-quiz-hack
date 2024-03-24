"use server";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Cookie:
      "connect.sid=s%3AI0C93-TnT8-Ibb_XCgTNZaQVTJBRM_31.2luvXw2n2Yv9CoghWU4baqQNYLE8l8VT%2BstjozeKFk4",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
    Origin: "https://quiz.q-meieriene.no",
  },
  body: '{"answer":"__wrong_answer__","score":90}',
};
export async function getAnswerFromAPI(): Promise<Q_Answer> {
  const answerFromAPI = await fetch(
    "https://quiz.q-meieriene.no/api/app/quiz/check-answer",
    options
  );
  const asnwerJSON = await answerFromAPI.json();
  return asnwerJSON;
}
