"use server";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Cookie:
      "connect.sid=s%3AmbPnMstV5bM5oM9gBPM9tcyaXuwPkyQz.NlK93B9gCJoTJA1nLnzXUKZuZHuAC3YsIHPwAi80hUQ",
    Origin: "https://quiz.q-meieriene.no",
  },
  body: "",
};

export async function applyScore(): Promise<boolean> {
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
