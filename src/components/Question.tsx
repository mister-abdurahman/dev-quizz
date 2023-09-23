import React from "react";
import Options from "./Options";
import { useQuizz } from "../contexts/quizzContext";

interface questionType {
  question: string;
  points: number;
}

export default function Question({}) {
  const { questions, index } = useQuizz();
  const question = questions && questions.at(index!);

  return (
    <div className="text-white mt-6">
      <h3 className="text-3xl font-bold">{question?.question}</h3>
      <Options key={question?.question} question={question} />
      <p className="text-center">Points: {question?.points}</p>
    </div>
  );
}
