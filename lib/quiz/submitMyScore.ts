"use server";

export async function submitMyScore(): Promise<MyScoreJSON> {
  if (!process.env.COOKIE) throw new Error("No .env.COOKIE");
  const options = {
    method: "POST",
    headers: {
      Cookie: process.env.COOKIE,
    },
  };
  const res: MyScoreJSON = await fetch(
    "https://quiz.q-meieriene.no/api/app/results/rating",
    options
  ).then((res) => res.json());
  return res;
}
