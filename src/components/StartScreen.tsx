import React from "react";
import { useQuizz } from "../contexts/quizzContext";

export default function StartScreen() {
  const { totalQns, dispatch } = useQuizz();

  return (
    <div className="text-center mt-6 text-white flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold">Welcome to the React Quiz!</h1>
      <h3 className="text-xl">
        {" "}
        {totalQns} questions to test your react mastery
      </h3>
      <button
        onClick={() => dispatch && dispatch({ type: "start" })}
        className="bg-bg_dark px-[2rem] py-[1rem] w-fit rounded-[10rem] hover:bg-bg_darkest hover:border-white hover:border-2"
      >
        {" "}
        Lets Start!{" "}
      </button>
    </div>
  );
}
