import { useQuiz } from "./context/QuizContext";

export default function Options({ quastion }) {
  const { dispatch, answer } = useQuiz();

  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {quastion.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswer
              ? i === quastion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={i}
          disabled={hasAnswer}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: i });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

//
