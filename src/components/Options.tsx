import React from "react";

export default function Options({ dispatch, question, selectedAns }: any) {
  const hasAnswered = selectedAns !== null;
  return (
    <div className="flex flex-col gap-5 my-8">
      {question.options.map((el: any, i: number) => (
        <button
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: i,
              points: question.points,
            })
          }
          className={`
          bg-bg_dark text-lg rounded-full text-left px-8 py-4 hover:bg-bg_darkest hover:border-white hover:border-2 hover:translate-x-6
            ${i === selectedAns ? "translate-x-6" : ""} 
            ${
              !hasAnswered
                ? ""
                : i === question.correctOption
                ? "correct"
                : "wrong"
            }
           `}
          disabled={hasAnswered}
        >
          {el}
        </button>
      ))}
    </div>
  );
}
