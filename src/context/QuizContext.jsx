import { createContext, useContext, useEffect, useReducer } from "react";

const SECS_PER_QUESTIONS = 30;

const QuizContext = createContext();
const initialState = {
  questions: [],
  status: "loading", // loading ,error ,ready,active,finished
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secoundLeft: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFelied":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secoundLeft: state.questions.length * SECS_PER_QUESTIONS,
      };
    case "newAnswer":
      const questionActive = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === questionActive.correctOption
            ? state.points + questionActive.points
            : state.points,
      };
    case "nextQuestions":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        secoundLeft: state.secoundLeft--,
        status: state.secoundLeft === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("ACTIONS UNKNOWN");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secoundLeft },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(
    function () {
      fetch(`http://localhost:9000/questions`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceved", payload: data }))
        .catch((err) => dispatch({ type: "dataFelied" }));
    },
    [dispatch]
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secoundLeft,
        dispatch,
        numQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("not value in context");
  return context;
}
export { QuizProvider, useQuiz };
