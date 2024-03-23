"use server";
import OpenAI from "openai";

import { generatePrompt } from "../utils/generatePrompt";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase_config";

if (!(process.env.OPENAI_KEY && process.env.ORG_ID))
  throw new Error("No openAI env files");
const openai = new OpenAI({
  organization: process.env.ORG_ID,
  apiKey: process.env.OPENAI_KEY,
});

export async function getAnswerFromGPT(
  question: FirebaseAnswer,
  updateRecord: boolean = false
): Promise<string | null> {
  console.log("3. Getting asnwer from GPT_3");
  // Do some really fancy advanced shit I can't comprehend yet ...
  const prompt = generatePrompt(question);
  const answer_index = await askGPT3(prompt);
  const answer = question.answers[answer_index];
  if (typeof answer !== "number") console.log("NOT NUMBER: ", answer);
  if (updateRecord) {
    console.log("4. Updating record | docID: ", question.id);
    const docRef = doc(db, "answers", question.id);
    try {
      await setDoc(
        docRef,
        {
          question: question.question,
          answer: answer,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error updating doc: ", e);
    }
  }
  return answer;
}

async function askGPT3(prompt: string): Promise<number> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    // max_tokens: 4096,
    messages: [
      {
        role: "system",
        content:
          "Hjelp brukeren til å svare på quiz spørsmål med å gi en array index som svar. Du kan bare svare med tall.",
      },
      { role: "user", content: prompt },
    ],
  });

  const gpt_answer = completion.choices[0].message.content;
  return Number(gpt_answer);
}
