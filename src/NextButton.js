import { useQuiz } from "./context/QuizContext";

export default function NextButton() {
  const { dispatch, answer, numQuestions, index } = useQuiz();
  if (answer === null) return;
  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui "
        onClick={() => dispatch({ type: "nextQuestions" })}
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui "
        onClick={() => dispatch({ type: "finish" })}
      >
        finish
      </button>
    );
  }
}
