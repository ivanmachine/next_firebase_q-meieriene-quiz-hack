import Leaderboard from "@/components/Leaderboard";
import s from "./page.module.scss";
import Hackquiz from "@/components/Hackquiz";

export default function Home() {
  return (
    <main className={`${s.main} container`}>
      <h1 className={s.header}>Homepage</h1>
      <section className={s.content}>
        <Hackquiz />
        <Leaderboard />
      </section>
    </main>
  );
}
