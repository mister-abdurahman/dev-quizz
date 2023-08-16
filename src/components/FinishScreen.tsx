import React from "react";

export default function FinishScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
  bestTime,
}: any) {
  const percent = (points / totalPoints) * 100;

  let emoji;
  console.log(bestTime);

  function setEmoji(percent: number) {
    switch (true) {
      case percent === 100:
        return (emoji = "🏆");
      case percent >= 80 && percent < 100:
        return (emoji = "🎉");
      case percent >= 50 && percent < 80:
        return (emoji = "🙂");
      case percent > 0 && percent < 50:
        return (emoji = "😖");
    }
  }
  setEmoji(percent);

  const min = Math.floor(bestTime / 60);
  const sec = Math.floor(bestTime % 60);

  return (
    <>
      <div className="text-white bg-[#088] text-center px-20 py-3 rounded-3xl text-lg mt-20">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {totalPoints} points. ({Math.ceil(percent)}%)
      </div>
      <p className="text-white text-center mt-5">
        (Highscore: <strong>{highScore}</strong> points)
      </p>
      <p className="text-white text-center mt-5">
        (Best Time:{" "}
        <strong>
          {min > 9 ? min : `${min}`.padStart(2, "0")}:
          {sec > 9 ? sec : `${sec}`.padStart(2, "0")}
        </strong>
        )
      </p>
      <button
        className="bg-bg_dark px-[2rem] text-white py-[1rem] w-fit rounded-[10rem] hover:bg-bg_darkest hover:border-white hover:border-2 absolute right-0 -bottom-[15rem]"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}
