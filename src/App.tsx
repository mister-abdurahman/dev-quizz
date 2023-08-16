import { useEffect, useReducer, useState } from "react";
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

interface questionProps {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

const initialState = {
  questions: [],
  status: "Loading", //loading, errr, ready, active, finished.
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  bestTime: 280,
  // restart: false,
};

const secs_per_question = 30;

function reducer(
  state: {
    questions: [];
    status: string;
    index: number;
    points: number;
    highScore: number;
    secondsRemaining: number;
    bestTime: number;
    // restart: boolean;
  },
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "start":
      return {
        ...state,
        status: "Active",
        secondsRemaining: state.questions.length * secs_per_question,
      };
    case "newAnswer":
      const currQuestion: any = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currQuestion?.correctOption
            ? state.points + currQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "Finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        bestTime:
          // state.bestTime !== 0 && state.secondsRemaining < state.bestTime
          state.secondsRemaining < state.bestTime
            ? state.secondsRemaining
            : state.bestTime,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "Finished" : state.status,
      };
    case "restart":
      return {
        ...state,
        index: 0,
        answer: null,
        secondsRemaining: 10,
        // highScore: 0,
        points: 0,
        // questions: [],
        status: "Ready",
        // restart: true, //create a boolean state and put it in the useEffect array to re-fetch qns on restart
      };
    default:
      throw new Error("Action Unknown");
  }
}
// dispatch({type: "start"})
function App() {
  // const [state, dispatch]: any = useReducer<any>(reducer, initialState);
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      secondsRemaining,
      bestTime,
    },
    dispatch,
  ]: any = useReducer<any>(reducer, initialState);

  const totalQns = questions.length;
  const totalPoints = questions.reduce(
    (acc: any, currVal: any) => acc + currVal.points,
    0
  );

  useEffect(
    function () {
      const res = fetch("http://localhost:4000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataRecieved", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
    },

    // [restart]
    []
  );
  return (
    <div className="bg-bg_darkest min-h-[100vh] pt-24 flex flex-col items-center gap-3">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <ErrorComp />}
        {status === "Ready" && (
          <StartScreen totalQns={totalQns} dispatch={dispatch} />
        )}
        {status === "Active" && (
          <>
            <Progress
              totalQns={totalQns}
              index={index}
              points={points}
              totalPoints={totalPoints}
              selectedAns={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              selectedAns={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                selectedAns={answer}
                index={index}
                totalQns={totalQns}
              />
            </Footer>
          </>
        )}
        {status === "Finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
            bestTime={bestTime}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
