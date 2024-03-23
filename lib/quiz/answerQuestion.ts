"use server";
import { getAnswerFromFirebase } from "../firebase/getAnswerFromFirebase";
import { getAnswerFromGPT } from "./getAnswerFromGPT";
// MAKE SURE TO USE CORRECT DATA FORMATTING, OR YOU'D WISH YOU'D KILL YOURSELF

export async function answerQuestion(
  question: FirebaseAnswer
): Promise<string | null> {
  console.log("2. Answering");
  const firebase__answer = await getAnswerFromFirebase(question.id);
  if (firebase__answer !== null) return firebase__answer;
  else {
    const GPT_answer: string | null = await getAnswerFromGPT(question, true); // get answer from god
    console.log("GPT answer: ", GPT_answer);
    return GPT_answer;
  }
}
