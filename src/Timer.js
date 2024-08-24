import { useEffect } from "react";
import { useQuiz } from "./context/QuizContext";

export default function Timer() {
  const { dispatch, secoundLeft } = useQuiz();
  const min = Math.floor(secoundLeft / 60);
  const secound = secoundLeft % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{secound < 10 && "0"}
      {secound}
    </div>
  );
}
