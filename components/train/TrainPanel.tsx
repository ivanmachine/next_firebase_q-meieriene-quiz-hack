"use client";
import { useState } from "react";
import s from "./TrainPanel.module.scss";
import { getRandomQuestion } from "@/lib/quiz/getRandomQuestion";
import { getHash } from "@/lib/utils/getHash";
import { doesDocExist } from "@/lib/firebase/doesDocExist";
import { getAnswerFromAPI } from "@/lib/quiz/getAnswerFromAPI";
import { uploadAnswer } from "@/lib/firebase/uploadAnswer";

export default function TrainPanel() {
  const [skippedWrites, setskippedWrites] = useState(0);
  const [errorCount, seterrorCount] = useState(0);
  const [writes, setwrites] = useState(0);
  const [requestsSent, setrequestsSent] = useState(0);
  const [currentRequest, setcurrentRequest] = useState<QuizQuestion>();
  const [answer, setanswer] = useState<string>("");
  const [requestLimit, setRequestLimit] = useState(0);
  async function trainDatabase() {
    let localTurn = 1;
    for (let i = 1; i <= requestLimit; i++) {
      console.log("Localturn: ", localTurn);
      setrequestsSent((prev) => prev + 1);
      const randomQuestion = await getRandomQuestion(localTurn);
      const randomQuestionHash = getHash(randomQuestion.question);
      const exists = await doesDocExist(randomQuestionHash);
      if (exists) {
        console.warn("Question exists: ", randomQuestion.question);
        setskippedWrites((prev) => prev + 1);
      } else {
        setcurrentRequest(randomQuestion);
        const answer = await getAnswerFromAPI();
        if (answer.correct) {
          setanswer(answer.correct);
          await uploadAnswer({
            question: randomQuestion.question,
            answer: answer.correct,
            id: randomQuestionHash,
          });
          setwrites((prev) => prev + 1);
        } else {
          seterrorCount((prev) => prev + 1);
          console.error("No answer");
        }
      }
      if (localTurn >= 20) localTurn = 1;
      else localTurn++;
    }
    alert("Done!");
  }
  return (
    <>
      <div className={s.train__panel}>
        <h2>Controls</h2>
        <button onClick={trainDatabase}>Train</button>
        <input
          type="number"
          placeholder="How many train requests"
          onChange={(e) => {
            setRequestLimit(Number(e.target.value));
          }}
        />
        <p>Requests total: {requestsSent}</p>
        <p>DB writes: {writes}</p>
        <p>DB writes skipped: {skippedWrites}</p>
        <p>Errors: {errorCount}</p>
      </div>
      <div className={s.currentRequest}>
        <h2>Current question</h2>
        <p>Hash: {currentRequest ? getHash(currentRequest.question) : ""}</p>
        <p>Question: {currentRequest?.question}</p>
        <p>Answer: {answer}</p>
      </div>
    </>
  );
}
