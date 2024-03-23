import { db } from "./firebase_config";

export async function getAnswerFromFirebase(hash: string) {
  const docRef = db.collection("answers").doc("hash");
  const doc = await docRef.get();
  let answerData = null;

  if (doc.exists) {
    answerData = doc.data()?.answer;
  } else {
    console.log("No such document!");
  }
  console.log("Answerdata: ", answerData);
}
