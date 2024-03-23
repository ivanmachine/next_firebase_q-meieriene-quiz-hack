"use client";
import { useEffect, useState } from "react";
import s from "./Hackquiz.module.scss";
import { getQuestionFromNumber } from "@/lib/quiz/getQuestion";
import Question from "./Question";
export default function Hackquiz() {
  const [loading, setLoading] = useState(true);
  const [quizQuestionJSON, setQuizQuestionJSON] = useState<QuizQuestion>();
  const [questionNR, setQuestionNR] = useState(1);
  function resetQuiz() {
    setQuestionNR(1);
  }
  async function getQuizQuestion() {
    setLoading(true);
    const res = await getQuestionFromNumber(questionNR);
    setQuestionNR((prev) => ++prev);
    setQuizQuestionJSON(res);
    setLoading(false);
  }
  useEffect(() => {
    getQuizQuestion();
  }, []);
  return (
    <div className={`${s.hack__dashboard} ${loading ? "loading" : undefined}`}>
      <Question
        getQuizQuestion={getQuizQuestion}
        resetQuiz={resetQuiz}
        questionNR={questionNR}
        quizQuestionJSON={quizQuestionJSON}
      />
      <div className={s.answers}>
        <h1>Svar</h1>
      </div>
    </div>
  );
}
