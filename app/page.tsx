import Leaderboard from "@/components/Leaderboard";
import s from "./page.module.scss";

export default function Home() {
  return (
    <main className={`${s.main} container`}>
      <h1 className={s.header}>Homepage</h1>
      <section className={s.content}>
        <div>Other stuf</div>
        <Leaderboard />
      </section>
    </main>
  );
}
