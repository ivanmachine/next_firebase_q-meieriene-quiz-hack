import PropogateAnswers from "@/components/database/PropogateAnswers";
import s from "./page.module.scss";
import GatherQuestions from "@/components/database/GatherQuestions";

export default function page() {
  return (
    <main className={`${s.database__wrapper} container`}>
      <h1>Database tools</h1>
      <div className="ui__wrapper">
        <PropogateAnswers />
        <GatherQuestions />
      </div>
    </main>
  );
}
