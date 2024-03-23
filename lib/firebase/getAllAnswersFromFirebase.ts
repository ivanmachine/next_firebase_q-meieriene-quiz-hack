"use server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase_config";

export async function getAllAnswersFromFirebase() {
  const querySnapshot = await getDocs(collection(db, "answers"));
  const answersArray: FirebaseAnswer[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    answer: doc.data().answer,
    answers: doc.data().answers,
    question: doc.data().question,
  }));
  return answersArray;
}
