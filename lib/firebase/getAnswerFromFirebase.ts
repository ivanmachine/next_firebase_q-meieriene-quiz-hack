import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase_config"; // Ensure this path is correct

export async function getAnswerFromFirebase(
  hash: string
): Promise<string | null> {
  try {
    // Reference to a document in the 'answers' collection with the id 'hash'
    const docRef = doc(db, "answers", hash); // Note the change here, using `doc()` directly
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data()?.answer) {
      const answerData = docSnap.data().answer;
      return answerData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.warn("Error getting from firebase");
    return null;
  }
}
