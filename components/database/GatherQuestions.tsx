"use client";
import s from "./GatherQuestions.module.scss";

export default function GatherQuestions() {
  async function gatherQuestions() {}
  return (
    <div className={s.gather__questions}>
      <h3>Gather questions</h3>
      <input type="number" placeholder="How many requests will you make?" />
      <button onClick={gatherQuestions}>fetch</button>
    </div>
  );
}
