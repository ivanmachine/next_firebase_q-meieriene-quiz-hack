"use server";

export async function getLeaderboard(
  numberOfPeople: number = 10
): Promise<LeaderBoardPerson[]> {
  const leaderboard = await fetch(
    "https://quiz.q-meieriene.no/api/app/top-list/get",
    {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    }
  );
  const leaderboardJSON: LeaderBoardJSON = await leaderboard.json();
  return leaderboardJSON.items.slice(0, numberOfPeople);
}

export async function getMyScore(): Promise<MyScoreJSON> {
  if (!process.env.COOKIE) throw new Error("No .env.cookie");
  const score = await fetch(
    "https://quiz.q-meieriene.no/api/app/results/rating",
    {
      method: "POST",
      headers: {
        Origin: "https://quiz.q-meieriene.no",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
        "Content-Type": "application/json",
        Cookie: process.env.COOKIE,
      },
    }
  );
  const scoreJSON: MyScoreJSON = await score.json();
  return scoreJSON;
}
