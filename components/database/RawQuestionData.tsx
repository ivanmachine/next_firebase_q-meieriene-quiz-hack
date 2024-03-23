"use client";
import { db } from "@/lib/firebase/firebase_config";
import React, { useEffect, useState } from "react";

export default function RawQuestionData() {
  const [answers, setAnswers] = useState(); // State to store the fetched documents

  useEffect(() => {
    // Fetch all documents from the /answers collection
    const fetchAnswers = async () => {
      const snapshot = await db.collection("answers").get();
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Spread the data into the object
      }));
      setAnswers(docs); // Update the state with the fetched documents
    };

    fetchAnswers(); // Call the function to fetch documents
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h2>RawQuestionData</h2>
      <ul>
        {answers?.map((answer) => (
          <li key={answer.id}>
            Answer ID: {answer.id}, Answer: {answer.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}
