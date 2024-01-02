import { useEffect, useState } from "react";
import { getQuestions } from "../../lib/question";
import QuestionItem from "./item";
import QA from "../QA/index"
import Header from "src/components/common/Header";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);

  // const questionList = questions.map(({
  //   id,
  //   title,
  //   content
  // }) => (
  //   <QuestionItem key={id} id={id} title={title} content={content} />
  // ))

  useEffect(() => {
    async function wait() {
      try {
        setLoad(true);
        const questions = await getQuestions();
        setQuestions(questions);
      } catch (error) {
        setError(true);
      } finally {
        setLoad(false);
      }
    }
    wait();
  }, []);
  if (load) {
    return "조회중";
  }

  if (error) {
    return "에러 발생";
  }

  return (
    <div>
      <Header />
      {questions.map(({ id, title, content, answers, writer, viewCount}) => (
        <QuestionItem key={id} id={id} viewCount={viewCount} answers={answers.length} writer={writer.name} profile={writer.profile} title={title} content={content} />
      ))}
    </div>
  );
}

export default Questions;
