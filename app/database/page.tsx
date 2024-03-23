import RawQuestionData from "@/components/database/RawQuestionData";
import s from "./page.module.scss";

export default function page() {
  return (
    <main className={`container`}>
      <h1>Database tools</h1>
      <div className={`${s.data__list} ui__wrapper`}>
        <RawQuestionData />
        {/* <h1>Thing 2</h1> */}
      </div>
    </main>
  );
}
