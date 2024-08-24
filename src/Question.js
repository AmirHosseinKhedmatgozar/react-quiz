import { useQuiz } from "./context/QuizContext.jsx";
import Options from "./Options.js";
export default function Question() {
  const { questions, index } = useQuiz();
  const quastion = questions.at(index);

  return (
    <div>
      <h4>{quastion.question}</h4>
      <Options quastion={quastion} />
    </div>
  );
}
