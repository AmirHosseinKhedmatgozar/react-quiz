import { useQuiz } from "./context/QuizContext";

export default function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>welcome to react quiz</h2>
      <h3>{numQuestions} quastions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Let`s Start
      </button>
    </div>
  );
}
