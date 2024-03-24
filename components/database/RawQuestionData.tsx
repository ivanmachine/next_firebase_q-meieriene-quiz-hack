"use client";
import React, { useEffect, useState } from "react";
import { getAllAnswersFromFirebase } from "@/lib/firebase/getAllAnswersFromFirebase";
import s from "./RawQuestionData.module.scss";
export default function RawQuestionData() {
  const [answers, setAnswers] = useState<FirebaseAnswer[]>();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getAllAnswers();
  }, []);

  async function getAllAnswers() {
    setloading(true);
    const updatedAnswers = await getAllAnswersFromFirebase();
    setAnswers(updatedAnswers);
    setloading(false);
  }

  return (
    <div className={`${loading ? "loading" : undefined}`}>
      <h2>Raw Question Data</h2>
      <button onClick={getAllAnswers}>refresh</button>
      <p>
        Antall<b>{answers?.length}</b>
      </p>
      <ul className={s.answers__list}>
        {answers?.map((answer) => {
          return <Answer key={answer.id} answer={answer} />;
        })}
      </ul>
    </div>
  );
}

function Answer({ answer }: { answer: FirebaseAnswer }) {
  return (
    <li
      className={s.answer}
      style={{ backgroundColor: answer.answer ? "lime" : "red" }}
    >
      <p>ID: {answer.id}</p>
      <p>Question: {answer.question}</p>
      <p>Potential answers:</p>
      <p>Answer: {answer.answer}</p>
    </li>
  );
}
