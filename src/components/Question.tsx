import React from "react";
import Options from "./Options";

export default function Question({ question, dispatch, selectedAns }: any) {
  return (
    <div className="text-white mt-6">
      <h3 className="text-3xl font-bold">{question.question}</h3>
      <Options
        key={question.question}
        question={question}
        dispatch={dispatch}
        selectedAns={selectedAns}
      />
      <p className="text-center">Points: {question.points}</p>
    </div>
  );
}
