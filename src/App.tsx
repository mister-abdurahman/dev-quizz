import { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComp from "./components/ErrorComp";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { QuizzProviderContext, useQuizz } from "./contexts/quizzContext";

// interface questionProps {
//   question: string;
//   options: string[];
//   correctOption: number;
//   points: number;
// }

function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
    bestTime,
    dispatch,
  } = useQuizz();

  return (
    <div className="bg-bg_darkest min-h-[100vh] pt-24 flex flex-col items-center gap-3">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <ErrorComp />}
        {status === "Ready" && <StartScreen />}
        {status === "Active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "Finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
