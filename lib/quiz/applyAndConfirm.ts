"use server";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Cookie: process.env.COOKIE ?? "blank",
    Origin: "https://quiz.q-meieriene.no",
  },
  body: "",
};

export async function applyScore(): Promise<boolean> {
  if (options.headers.Cookie === "blank") throw new Error("No .env");
  options.body = JSON.stringify({
    name: "Ivan Dmitrievich Tarnyagin",
    phone: "481 57 049",
  });
  const res = await fetch(
    "https://quiz.q-meieriene.no/api/app/registration/apply",
    options
  ).then((res) => res.json());

  return res.OK;
}

export async function confirmScore(code: number) {
  options.body = JSON.stringify({ code: code.toString() });
  const res = await fetch(
    "https://quiz.q-meieriene.no/api/app/registration/confirm"
  ).then((res) => res.json());
  return res.OK;
}
