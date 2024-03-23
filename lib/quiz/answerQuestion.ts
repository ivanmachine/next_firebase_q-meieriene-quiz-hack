import { getAnswerFromFirebase } from "../firebase/getAnswerFromFirebase";
export async function answerQuestion(
  question: FirebaseAnswer
): Promise<string | null> {
  console.log("2. Answering");
  const firebase__answer = await getAnswerFromFirebase(question.id);
  if (firebase__answer !== null) return firebase__answer;
  else {
    // guess the answer, see the correct reply, and upload it to firebase
    return "";
  }
}
