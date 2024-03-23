"use client";
import { propogateQuestions } from "@/lib/quiz/propogateQuestions";
import s from "./GatherQuestions.module.scss";
import { useState } from "react";

export default function GatherQuestions() {
  const [amount, setAmount] = useState<number>(0);
  const [propogated, setpropogated] = useState<string[]>([]);
  async function gatherQuestions() {
    const propogated = await propogateQuestions(amount);
    setpropogated(propogated);
  }
  return (
    <div className={s.gather__questions}>
      <h3>Gather questions</h3>
      <input
        type="number"
        onChange={(e) => {
          const amount = Number(e.target.value);
          setAmount(amount);
        }}
        placeholder="How many requests will you make?"
      />
      <button onClick={gatherQuestions}>fetch</button>
      {propogated.map((hash) => {
        return <p key={hash}>{hash}</p>;
      })}
    </div>
  );
}
