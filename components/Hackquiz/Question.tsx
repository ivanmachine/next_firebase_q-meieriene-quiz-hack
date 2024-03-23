import { MouseEventHandler } from "react";
import s from "./Question.module.scss";
export default function Question({
  getQuizQuestion,
  resetQuiz,
  questionNR,
  quizQuestionJSON,
}: {
  getQuizQuestion: MouseEventHandler<HTMLButtonElement>;
  resetQuiz: MouseEventHandler<HTMLButtonElement>;
  questionNR: number;
  quizQuestionJSON: QuizQuestion | undefined;
}) {
  return (
    <div className={s.question}>
      <div className={s.buttons}>
        <button onClick={getQuizQuestion}>Hack</button>
        <button onClick={resetQuiz}>Reset counter</button>
      </div>
      <p>Spørresmål NR: {questionNR}</p>
      <p>{quizQuestionJSON?.question}</p>
      <ul>
        {quizQuestionJSON?.answers?.map((answerAlternative, index) => {
          return <li key={index}>{answerAlternative}</li>;
        })}
      </ul>
    </div>
  );
}
