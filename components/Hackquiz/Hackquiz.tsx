"use client";

import { getDocFromID } from "@/lib/firebase/getDocFromID";
import { uploadAnswer } from "@/lib/firebase/uploadAnswer";
import { answerQuestion } from "@/lib/quiz/answerQuestion";
import { getAnswerFromAPI } from "@/lib/quiz/getAnswerFromAPI";
import { getMyScore } from "@/lib/quiz/getLeaderboard";
import { getQuestionFromTurn } from "@/lib/quiz/getQuestionFromTurn";
import { submitMyScore } from "@/lib/quiz/submitMyScore";
import { getHash } from "@/lib/utils/getHash";
import { useState } from "react";
import { findBestMatch } from "string-similarity";

export default function Hackquiz() {
  const [currentAnswer, setcurrentAnswer] = useState("pending");
  const [questionTurn, setquestionTurn] = useState(1);
  const [currentQuestion, setcurrentQuestion] = useState<string>("");
  const [correctlyAnswered, setcorrectlyAnswered] = useState(0);

  async function hackQuiz() {
    for (let i = 1; i <= 20; i++) {
      console.log("Turn number: ", i);
      const question = await getQuestionFromTurn(i);
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
            const myScore = await getMyScore();
            console.log("My score: ", myScore.score);
          } else {
            console.log("Answered wrong");
            // Upload answer, to
          }
          setquestionTurn((prev) => prev + 1);
          continue;
        }
      } else {
        console.error("No answer for question: ", question.question);
        const correctAnswer = await getAnswerFromAPI();
        if (!correctAnswer.correct)
          throw new Error("No correct answer from API");
        console.log("Found the correct answer, and uploading it to the DB");
        await uploadAnswer({
          id: getHash(question.question),
          answer: correctAnswer.correct,
          question: question.question,
        });
      }
    }
    setquestionTurn(1);
    // const myScore = await getMyScore();
    // console.log("My score: ", myScore.score);
    // console.log("My position: ", myScore.position);
    // console.log("Score in general: ", myScore);
    console.log("Submitting my score ... ");
    const myScore = await submitMyScore();
    console.log("My score: ", myScore.score);
    console.log("My position: ", myScore.position);
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
