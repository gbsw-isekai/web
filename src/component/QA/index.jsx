import { useEffect, useState } from "react";
import Answer from "./answer";
import {
  createView,
  deleteBoard,
  getBoardById,
  getMyAccount,
} from "../../lib/api";
import { Link, useNavigate, useParams } from "react-router-dom/dist";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useToken from "../../hooks/useToken";

dayjs.extend(relativeTime);
dayjs.locale("ko");

function QA() {
  const [token, userId] = useToken();
  const [data, setData] = useState();
  const { questionId } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await createView(questionId, token);

      if (response.status != 200) {
        console.log("에러");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const getData = await getBoardById(questionId);

      if (!!token) {
        if (userId == getData.data.writer.id) getData.data["isOwner"] = true;
        else getData.data["isOwner"] = false;
      }

      setData(getData.data);
    })();
  }, []);

  const onDeleteHandler = () => {
    (async () => {
      const response = await deleteBoard(questionId, token);

      if (response.status != 200) {
        console.log("에러");
      }

      navigator("/questions");
    })();
  };

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
          <div className="text-xl mb-2 flex justify-between">
            <div>Q {data.title}</div>
            {data.isOwner ? (
              <div>
                <Link to={`/question/${questionId}/editor`}>수정하기</Link>
                <div onClick={onDeleteHandler}>삭제하기</div>
              </div>
            ) : null}
          </div>
          <div className="mb-5 whitespace-pre-line">{data.content}</div>
          <div className="mb-6">
            <a href="/" className="text-blue-800">
              고등학교진학
            </a>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="question-profile">profile-icon</div>
              <div className="question-name">{data.writer.id}</div>
              <div className="question-date">
                · {dayjs(data.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </div>
              <div className="question-views">· 조회수 {data.viewCount}</div>
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
        <Link to={`/question/${questionId}/answers/editor`}>
          <div className="w-full text-center border-y-2 border-gray-800 bg-green-600 text-white">
            답변작성
          </div>
        </Link>

        {data.answers.map((e) => (
          <Answer
            key={e.id}
            nickname={e.writer.id}
            content={e.content}
            isOwner={e.writer.id == userId}
            editUrl={`/question/${questionId}/answers/${e.id}/editor`}
          />
        ))}
      </section>
      <footer className="main-footer"></footer>
    </div>
  );
}

export default QA;
