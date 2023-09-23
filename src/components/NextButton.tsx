import { useQuizz } from "../contexts/quizzContext";

export default function NextButton() {
  const { dispatch, answer, index, totalQns } = useQuizz();

  if (answer === null) return <>{null}</>;
  else if (index! < totalQns! - 1)
    return (
      <button
        className="bg-bg_dark px-[2rem] text-white py-[1rem] w-fit rounded-[10rem] hover:bg-bg_darkest hover:border-white hover:border-2 absolute right-2 -bottom-8"
        onClick={() => dispatch && dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  else if (index === totalQns! - 1)
    return (
      <button
        className="bg-bg_dark px-[2rem] text-white py-[1rem] w-fit rounded-[10rem] hover:bg-bg_darkest hover:border-white hover:border-2 absolute right-2 -bottom-8"
        onClick={() => dispatch && dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  else return <>{null}</>;
}
