"use client";

import { useState } from "react";

export default function PropogateAnswers() {
  const [amount, setAmount] = useState(0);
  async function propogateAnswers() {}
  return (
    <div>
      <h3>Gather questions</h3>
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
