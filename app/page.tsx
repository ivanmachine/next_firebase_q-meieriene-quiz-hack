import Leaderboard from "@/components/Leaderboard";
import s from "./page.module.scss";
import Hackquiz from "@/components/Hackquiz/Hackquiz";

export default async function Home() {
  return (
    <main className={`${s.main} container`}>
      <h1 className={s.header}>Homepage</h1>
      <section className={`${s.content} ui__wrapper`}>
        <h2>Right panel</h2>
        <Leaderboard />
      </section>
    </main>
  );
}
