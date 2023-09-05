import React, { useEffect } from "react";
import { useQuizz } from "../contexts/quizzContext";

export default function Timer() {
  const { secondsRemaining, dispatch } = useQuizz();

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch && dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  const min = Math.floor(secondsRemaining! / 60);
  const sec = Math.floor(secondsRemaining! % 60);

  return (
    <div className="px-[2rem] text-white py-[1rem] w-fit rounded-[10rem] bg-bg_darkest border-white border-2 absolute left-2 -bottom-8">
      {min > 9 ? min : `${min}`.padStart(2, "0")}:
      {sec > 9 ? sec : `${sec}`.padStart(2, "0")}
    </div>
  );
}
