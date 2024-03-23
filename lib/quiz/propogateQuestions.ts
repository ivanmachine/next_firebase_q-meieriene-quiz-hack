"use server";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { getHash } from "./getHash";
import { getQuestionFromNumber } from "./getQuestionFromNumber";
import { db } from "../firebase/firebase_config";

export async function propogateQuestions(number__of__questions: number) {
  const propogated: string[] = [];
  let turn_number = 1;
  let new_docs = 0;
  let skipped_docs = 0;
  for (let i = 0; i < number__of__questions; i++) {
    const question: QuizQuestion = await getQuestionFromNumber(turn_number);
    const question_hash = getHash(question.question);

    const docRef = doc(db, "answers", question_hash);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) skipped_docs++;
    else {
      await setDoc(docRef, question);
      propogated.push(question_hash);
      new_docs++;
    }
    if (turn_number < 20) {
      turn_number++;
    } else turn_number = 1;
    console.log(`New: ${new_docs} skipped: ${skipped_docs}`);
  }
  console.log("🚀 Done!");
  return propogated;
}
