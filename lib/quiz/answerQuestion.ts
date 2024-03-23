"use server";
import { getAnswerFromFirebase } from "../firebase/getAnswerFromFirebase";
import { getAnswerFromGPT_3 } from "./getAnswerFromGPT_3";
// MAKE SURE TO USE CORRECT DATA FORMATTING, OR YOU'D WISH YOU'D KILL YOURSELF

export async function answerQuestion(
  question: FirebaseAnswer
): Promise<string> {
  const firebase__answer = await getAnswerFromFirebase(question.id);
  if (firebase__answer !== null) return firebase__answer;
  else {
    const GPT_3_answer: string = await getAnswerFromGPT_3(question); // get answer from god
    return GPT_3_answer;
  }
}
