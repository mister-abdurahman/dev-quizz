import React from "react";

export default function NextButton({
  dispatch,
  selectedAns,
  index,
  totalQns,
}: any) {
  if (selectedAns === null) return null;
  if (index < totalQns - 1)
    return (
      <button
        className="bg-bg_dark px-[2rem] text-white py-[1rem] w-fit rounded-[10rem] hover:bg-bg_darkest hover:border-white hover:border-2 absolute right-2 -bottom-8"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === totalQns - 1)
    return (
      <button
        className="bg-bg_dark px-[2rem] text-white py-[1rem] w-fit rounded-[10rem] hover:bg-bg_darkest hover:border-white hover:border-2 absolute right-2 -bottom-8"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}
