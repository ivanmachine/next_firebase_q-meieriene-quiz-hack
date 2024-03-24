import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase_config";

export async function uploadAnswer(answerObject: FirebaseAnswer) {
  const docRef = doc(db, "answers", answerObject.id);
  await setDoc(docRef, answerObject);
  console.log("Succsessfully doc: ", answerObject.id);
}
