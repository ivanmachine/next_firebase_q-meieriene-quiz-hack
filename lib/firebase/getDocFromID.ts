import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase_config";

export async function getDocFromID(id: string): Promise<FirebaseAnswer | null> {
  const docRef = doc(db, "answers", id); // Note the change here, using `doc()` directly
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data()?.answer) {
    const answerData: FirebaseAnswer = docSnap.data().answer;
    return answerData;
  } else {
    return null;
  }
}
