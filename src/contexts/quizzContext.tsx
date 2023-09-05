import React, { createContext, useContext, useEffect, useReducer } from "react";

interface questionType {
  question: string,
  correctOption: number,
  options: string[],
  points: number
}
interface contextType {
  questions?: questionType[];
  status?: string;
  index?: number;
  answer?: string | null;
  points?: number;
  highScore?: number;
  secondsRemaining?: null | number;
  bestTime?: number;
  totalQns?: number;
  totalPoints?: number;
  dispatch?: Function;
}

const quizzContext = createContext<contextType>({});

const secs_per_question = 30;

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
  action: { type: string; payload: any }
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

function QuizzProviderContext({ children }: any) {
  const [contextData, dispatch]: any = useReducer<any>(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
    bestTime,
  } = contextData;

  const totalQns = questions.length;
  const totalPoints = questions?.reduce(
    (acc: any, currVal: any) => acc + currVal.points,
    0
  );

  useEffect(function () {
    async function fetchQuizz() {
      try {
        const res = await fetch("http://localhost:4000/questions");
        const resJson = await res.json();
        dispatch({ type: "dataRecieved", payload: resJson });
      } catch (error) {
        console.log(error);
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuizz();
  }, []);

  return (
    <quizzContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        bestTime,
        totalQns,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </quizzContext.Provider>
  );
}

function useQuizz() {
  const context = useContext(quizzContext);
  if (context === undefined)
    throw new Error("Component was used outside of Context");
  return context;
}

export { QuizzProviderContext, useQuizz };
