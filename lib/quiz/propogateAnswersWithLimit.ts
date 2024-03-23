"use server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase_config";
import { getHash } from "./getHash";
import { answerQuestion } from "./answerQuestion";

export async function propogateAnswersWithLimit(
  limit: number
): Promise<string[]> {
  const all_unanswered_questions = await getAllUnansweredQuestions();
  console.log("All unasnwered: ", all_unanswered_questions);
  let loop_limiter = 0;
  for (const question of all_unanswered_questions) {
    // const answer = await answerQuestion(question);
    console.count("Loop limiter");
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
    unanswered.push(doc.data() as FirebaseAnswer);
  });

  return unanswered;
}
