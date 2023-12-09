import { useEffect, useState } from "react";
import Answer from "./answer";
import { getQuestionById, getQuestions } from "../../lib/api";
import { useParams } from "react-router-dom";
import Comments from "./Comment";

function QA() {
  const [data, setData] = useState();
  const { id } = useParams();
  
  useEffect(() => {
    (async () => {
      const getData = await getQuestionById(id);
      console.log(getData);
      setData(getData.data);
    })();
  }, [id]);

  if (!data) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex flex-col">
      <header className="main-header">
        <h2 className="text-3xl font-medium">header</h2>
      </header>
      <section className="max-w-[1024px] self-center">
        <div className="flex flex-col border-t border-b">
          <div className="text-xl mb-2">Q {data.title}</div>
          <div className="mb-5">{data.content}</div>
          <div className="mb-6">
            <a href="/" className="text-blue-800">
              고등학교진학
            </a>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="question-profile">profile-icon</div>
              <div className="question-name">{data.writer.id}</div>
              <div className="question-date">· {data.createdAt}</div>
              <div className="question-views">· 조회수 1,216</div>
            </div>

            <div className="flex gap-2">
              <div className="reply_icon">reply_icon</div>
              <div className="question_report">report_icon</div>
            </div>
          </div>
        </div>
        <div className="answer-title">
          <div className="mb-3">A {data.answers.length}개</div>
        </div>

        {data.answers.map((e) => (
          <Answer key={e.id} nickname={e.writer.id} content={e.content} />
        ))}
      </section>

      <Comments qaId={id} />

      <footer className="main-footer"></footer>
    </div>
  );
}

export default QA;
