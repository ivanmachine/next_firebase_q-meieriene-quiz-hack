"use client";

import { getDocFromID } from "@/lib/firebase/getDocFromID";
import { answerQuestion } from "@/lib/quiz/answerQuestion";
import { getMyScore } from "@/lib/quiz/getLeaderboard";
import { getQuestionFromTurn } from "@/lib/quiz/getQuestionFromTurn";
import { getHash } from "@/lib/utils/getHash";
import { sleep } from "@/lib/utils/sleep";
import { useState } from "react";
import { findBestMatch } from "string-similarity";

export default function Hackquiz() {
  const [currentAnswer, setcurrentAnswer] = useState("pending");
  const [questionTurn, setquestionTurn] = useState(1);
  const [currentQuestion, setcurrentQuestion] = useState<string>("");
  const [correctlyAnswered, setcorrectlyAnswered] = useState(0);

  async function hackQuiz() {
    for (let i = 0; i < 20; i++) {
      const question = await getQuestionFromTurn(questionTurn);
      if (!question) throw new Error("Question is null");
      setcurrentQuestion(question.question);
      console.log("1. Got question: ", question);
      const questionHash = getHash(question.question);
      const answer = await getDocFromID(questionHash);
      if (answer) {
        {
          setcurrentAnswer(answer.answer);
          console.log("2. Got answer: ", answer.answer);
          const bestMatch = findBestMatch(answer.answer, question.answers)
            .bestMatch.target;
          console.log("2.5 Best match: ", bestMatch);
          const answerStatus: Q_Answer = await answerQuestion(bestMatch);
          console.log("3. Got answerstatus: ", answerStatus);
          if (answerStatus.OK) {
            console.log("4. Answered correctly, on to the next question!");
            setcorrectlyAnswered((prev) => prev + 1);
          } else {
            console.log("Answered wrong");
            // Upload answer, to
          }
          setquestionTurn((prev) => prev + 1);
          setcurrentAnswer("Loading next answer");
          continue;
        }
      } else {
        console.error("No answer for question: ");
        answerQuestion("__blank_answer__");
        // Answer with blank statement
        // Get the correct answer, and upload it to firebase
      }
    }
    setquestionTurn(1);
    const myScore = await getMyScore();
    console.log("My score: ", myScore.score);
    console.log("My position: ", myScore.position);
    console.log("Score in general: ", myScore);
  }
  return (
    <>
      <div>
        <h2>UI Controls</h2>
        <button onClick={hackQuiz}>Hack quiz</button>
        <p>Question number: {questionTurn}</p>
        <p>Correctly answered {correctlyAnswered}</p>
      </div>
      <div>
        <h2>Current data</h2>
        <p>Question turn: {questionTurn}</p>
        <p>Current question: {currentQuestion.substring(0, 35)}</p>
        <p>Question answer: {currentAnswer}</p>
      </div>
    </>
  );
}
