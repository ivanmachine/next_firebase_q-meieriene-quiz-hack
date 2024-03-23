"use server";
const myCookie = process.env.COOKIE;

export async function getQuestionFromNumber(
  questionNumber: number
): Promise<QuizQuestion> {
  if (myCookie) {
    const res = await fetch(
      "https://quiz.q-meieriene.no/api/app/quiz/pick-question",
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Cookie: myCookie,
        },
        method: "POST",
        body: JSON.stringify({
          turn: questionNumber,
        }),
      }
    );
    const questionJSON: QuizQuestion = await res.json();
    console.log("QuestionJSON: ", questionJSON);
    return questionJSON;
  } else throw new Error("No cookie for getQuestionFromNumber");
}
