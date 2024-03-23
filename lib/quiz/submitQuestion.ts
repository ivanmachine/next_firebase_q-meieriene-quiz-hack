import {
  standardizeAnswer,
  standardizeString,
} from "../utils/standardizeString";
import { answerQuestion } from "./answerQuestion";

const myCookie = process.env.COOKIE;

export async function submitQuestion(question: FirebaseAnswer) {
  if (myCookie) {
    const answer = await answerQuestion(question);
    if (answer === null) console.error("Answer is null when submitting");
    const res = await fetch(
      "https://quiz.q-meieriene.no/api/app/quiz/check-answer",
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Cookie: myCookie,
        },
        method: "POST",
        body: JSON.stringify({
          answer: answer,
          score: 88,
        }),
      }
    );
    const questionJSON: QuizQuestion = await res.json();
    console.log("Answer from correcteness API: ", questionJSON);
    return questionJSON;
  } else throw new Error("No cookie for getQuestionFromNumber");
}
