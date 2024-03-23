"use client";

import s from "./PropogateAnswers.module.scss";
import { useState } from "react";

export default function PropogateAnswers() {
  const [amount, setAmount] = useState<number>(0);
  async function propogateAnswers() {}
  return (
    <div className={s.propogate__answers}>
      <h3>Propogate answers</h3>
      <input
        type="number"
        onChange={(e) => {
          const amount = Number(e.target.value);
          setAmount(amount);
        }}
        placeholder="How many questions to propogate? (expensive)"
      />
      <button onClick={propogateAnswers}>fetch</button>
    </div>
  );
}
