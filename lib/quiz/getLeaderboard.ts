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

const myCookie = process.env.COOKIE;
export async function getMyScore(): Promise<MyScoreJSON> {
  if (myCookie) {
    const score = await fetch(
      "https://quiz.q-meieriene.no/api/app/results/rating",
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Cookie: myCookie,
          "User-Agent": "Mozilla/5.0",
        },
        method: "POST",
      }
    );
    const scoreJSON: MyScoreJSON = await score.json();
    return scoreJSON;
  } else throw new Error("No cookie in getMyScore()");
}
