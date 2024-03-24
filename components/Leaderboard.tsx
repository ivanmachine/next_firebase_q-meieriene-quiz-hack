"use client";
import { useEffect, useState } from "react";
import s from "./Leaderboard.module.scss";
import { getLeaderboard, getMyScore } from "@/lib/quiz/getLeaderboard";

export default function Leaderboard() {
  const [myScore, setMyScore] = useState<MyScoreJSON>();
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderBoardPerson[]>([]);
  useEffect(() => {
    refreshLeaderboard();
  }, []);

  async function refreshLeaderboard() {
    setLoading(true);
    const updated_Leaderboard: LeaderBoardPerson[] = await getLeaderboard();
    const updated_myscore = await getMyScore();
    console.log("My score: ", updated_myscore);
    setMyScore(updated_myscore);
    setLeaderboard(updated_Leaderboard);
    setLoading(false);
  }

  async function refreshSCore() {
    const leaderboard = await getLeaderboard(1200);
  }
  return (
    <>
      <div>
        <h2>My score</h2>
        <button>Refresh</button>
        <p>{}</p>
      </div>
      <div className={`${s.leaderboard} ${loading ? "loading" : undefined}`}>
        <button onClick={refreshLeaderboard}>Refresh</button>
        <h2>Leaderboard</h2>
        <b className={s.my__score}>
          <p>Meg:</p>
          <p>Posisjon: {myScore?.position}</p>
          <p>{myScore?.topScore}</p>
        </b>
        <ul className={`${s.leaderboard__score__list}`}>
          {leaderboard.map((person, index) => {
            return (
              <li key={index} className={`${s.leaderboard__item}`}>
                <p>{person.name}</p>
                <p>{person.topScore}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
