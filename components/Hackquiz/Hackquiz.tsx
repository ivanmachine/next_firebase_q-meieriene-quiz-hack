"use client";
import { useEffect, useState } from "react";
import s from "./Hackquiz.module.scss";
import { getQuestionFromNumber } from "@/lib/quiz/getQuestionFromNumber";
import { submitQuestion } from "@/lib/quiz/submitQuestion";
import { getDocFromID } from "@/lib/firebase/getDocFromID";
export default function Hackquiz() {
  const [loading, setLoading] = useState(false);
  const [q_nr, set_q_nr] = useState(1);
  const [rawQuestion, setRawQuestion] = useState<QuizQuestion>();
  const [question, setQuestion] = useState<FirebaseAnswer>();

  async function getQuestion() {
    setLoading(true);
    const raw_question = await getQuestionFromNumber(q_nr);
    setRawQuestion(raw_question);
    setLoading(false);
  }
  async function answerQuestion() {
    setLoading(true);
    if (question) {
      const res = await submitQuestion(question);
      console.log("Res: ", res);
    }
    set_q_nr((prev) => ++prev);
    setLoading(false);
  }
  return (
    <div className={`${s.hack__dashboard} ${loading ? "loading" : undefined}`}>
      <div className={s.settings_and_header}>
        <h1>Hack dashboard</h1>
        <p>
          Q: <b>{q_nr}</b>
        </p>
        <button onClick={getQuestion}>Get</button>
        <button onClick={answerQuestion}>Answer</button>
      </div>
      <div>
        <p>{rawQuestion?.answer}</p>
        <p>{rawQuestion?.hash}</p>
      </div>
      <div>
        <p>{question?.question}</p>
        <p>{question?.id}</p>
      </div>
    </div>
  );
}
