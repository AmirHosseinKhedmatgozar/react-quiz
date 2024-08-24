import { useQuiz } from "./context/QuizContext";

export default function FinishScreen() {
  const { points, maxPoints, highScore, dispatch } = useQuiz();
  const percentge = (points / maxPoints) * 100;
  let emoji;
  if (percentge === 100) emoji = "⭐";
  if (percentge < 100 && percentge >= 80) emoji = "😍";
  if (percentge < 80 && percentge >= 50) emoji = "🫡";
  if (percentge < 50 && percentge >= 20) emoji = "😐";
  if (percentge < 20 && percentge > 0) emoji = "🥹";
  if (percentge === 0) emoji = "😭";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong>out of
        {maxPoints} ({Math.ceil(percentge)})%
      </p>
      <p className="highscore">(Highscore:{highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}
