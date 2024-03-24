import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase_config";

export async function doesDocExist(id: string): Promise<boolean> {
  const docRef = doc(db, "answers", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return true;
  else return false;
}
