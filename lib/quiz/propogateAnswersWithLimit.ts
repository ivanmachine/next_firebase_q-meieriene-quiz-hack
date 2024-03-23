"use server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase_config";
import { getHash } from "./getHash";
import { answerQuestion } from "./answerQuestion";

export async function propogateAnswersWithLimit(
  limit: number
): Promise<string[]> {
  const propogatedAnswers: string[] = [];
  console.log("1. Propogating answer");
  const all_unanswered_questions = await getAllUnansweredQuestions();
  let loop_limiter = 1;
  for (const question of all_unanswered_questions) {
    const answer: string | null = await answerQuestion(question);
    if (answer === null) throw new Error("Top level answer propogation failed");
    propogatedAnswers.push(question.id);
    if (loop_limiter >= limit) break;
    loop_limiter++;
  }
  return [""];
}

async function getAllUnansweredQuestions(): Promise<FirebaseAnswer[]> {
  console.log("Getting all unasnwered");
  const q = query(collection(db, "answers"), where("answer", "==", null));

  const querySnapshot = await getDocs(q);
  const unanswered: FirebaseAnswer[] = [];
  querySnapshot.forEach((doc) => {
    const newObj = doc.data() as FirebaseAnswer;
    newObj.id = doc.id;
    unanswered.push(newObj);
  });

  return unanswered;
}
