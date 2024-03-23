"use server";
import { getAnswerFromFirebase } from "../firebase/getAnswerFromFirebase";
import { getAnswerFromGPT_3 } from "./getAnswerFromGPT_3";
// MAKE SURE TO USE CORRECT DATA FORMATTING, OR YOU'D WISH YOU'D KILL YOURSELF

export async function getAnswerFromHash(
  hash: string,
  question: FirebaseAnswer
) {
  const firebase__answer = await getAnswerFromFirebase(hash);
  if (firebase__answer !== null) return firebase__answer;
  else {
    await getAnswerFromGPT_3(question.question, question.answers); // get answer from god
  }
  // check if answer is correct
  // propogate to firebase if so
}
