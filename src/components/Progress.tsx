import React from "react";
import { useQuizz } from "../contexts/quizzContext";

export default function Progress() {
  const { totalQns, index, points, totalPoints, answer } = useQuizz();

  return (
    <header className="flex flex-col gap-3 mt-10">
      {/* convert the boolean to either 0/1 and add to index to display progress upo selecting an answer */}
      <progress
        max={totalQns}
        value={index! + Number(answer !== null)}
        className="progress-bar w-full"
      />
      <div className="flex justify-between text-white">
        <p>
          Question: <strong>{index! + 1}</strong> / {totalQns}
        </p>
        <p>
          {points} /{totalPoints} points
        </p>
      </div>
    </header>
  );
}
