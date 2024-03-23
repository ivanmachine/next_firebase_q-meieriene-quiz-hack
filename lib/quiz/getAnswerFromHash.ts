"use server";
import { getAnswerFromFirebase } from "../firebase/getAnswerFromFirebase";
import { getAnswerFromGPT_3 } from "./getAnswerFromGPT_3";

export async function getAnswerFromHash(hash: string) {
  const firebase__answer = await getAnswerFromFirebase(hash);
  if (firebase__answer !== null) return firebase__answer;
  else await getAnswerFromGPT_3("question", ["question alternatives"]);
}
