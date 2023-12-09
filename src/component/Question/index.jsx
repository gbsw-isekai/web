import { useEffect, useState } from "react";
import { getQuestions } from "../../lib/question";
import QuestionItem from "./item";



function Questions() {
  const [questions, setQuestions] = useState([]); 
  const questionList = questions.map(({
    id,
    title,
    content
  }) => (
    <QuestionItem key={id} id={id} title={title} content={content} />
  ))

  useEffect(() => {
    async function wait() {
      const questions = await getQuestions()
      setQuestions(questions)
    }
    wait();
  }, []);

  return (
    <div>
      {questionList}
    </div> 
  )
}

export default Questions;