"use server";

const options = {
  method: "POST",
  headers: {
    Origin: "https://quiz.q-meieriene.no",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
    "Content-Type": "application/json",
    Cookie:
      "connect.sid=s%3AI0C93-TnT8-Ibb_XCgTNZaQVTJBRM_31.2luvXw2n2Yv9CoghWU4baqQNYLE8l8VT%2BstjozeKFk4",
  },
  body: "",
};

export async function getQuestionFromTurn(
  turn: number
): Promise<QuizQuestion | null> {
  options.body = JSON.stringify({ turn: turn });
  const question = await fetch(
    "https://quiz.q-meieriene.no/api/app/quiz/pick-question",
    options
  );
  try {
    const questionJSON = await question.json();
    return questionJSON;
  } catch (e) {
    console.error("Error getting JSON: ", question.text());
    return null;
  }
}
