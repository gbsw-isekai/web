import { useEffect, useState } from "react";
import Answer from "./answer";

import { Link, useNavigate, useParams } from "react-router-dom/dist";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useToken from "../../hooks/useToken";
import Header from "src/components/common/Header";
import { Separator } from "src/components/ui/separator";
import { Button } from "src/components/ui/button";

import "dayjs/locale/ko";
import Comments from "./Comment";
import { createView, deleteBoard, getBoardById } from "src/lib/question";
import { Textarea } from "src/components/ui/textarea";
import QADropDown from "src/components/QA/qa-dropdown";
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

      if (response.status !== 200) {
        console.log("에러");
      }
    })();
  }, [questionId, token]);

  const getData = async () => {
    const getData = await getBoardById(questionId);

    if (!!token) {
      if (userId === getData.data.writer.id) getData.data["isOwner"] = true;
      else getData.data["isOwner"] = false;
    }

    setData(getData.data);
  };

  useEffect(() => {
    getData();
  }, [questionId, token, userId]);

  const onDeleteHandler = (questionId_) => {
    (async () => {
      const response = await deleteBoard(questionId_, token);

      if (response.status !== 200) {
        console.log("에러");
      }

      if (questionId_ === questionId) {
        return navigator("/questions");
      }

      return getData();
    })();
  };

  if (!data) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-full min-h-[calc(100vh-56.67px)] flex flex-col gap-5 py-8">
        <div className="flex flex-col w-full min-h-full bg-white">
          <div className="flex flex-col w-full max-w-[1024px] self-center border rounded-md px-4 py-4 gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-end">
                <span className="text-2xl font-bold">Q.</span>
                <div className="ml-2 text-2xl">{data.title}</div>
              </div>
              <QADropDown
                isOwner={data.isOwner}
                onDeleteHandler={() => onDeleteHandler(questionId)}
                editUrl={`/question/${questionId}/editor`}
              />
            </div>
            <div
              className="text-pretty"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <div className="">
              <a href="/" className="text-blue-800">
                고등학교진학
              </a>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full overflow-hidden">
                  <img src={data.writer.profile} alt="프로필사진" />
                </div>
                <div className="question-name">{data.writer.name}</div>
                <div className="question-date">
                  · {dayjs(data.createdAt).fromNow()}
                </div>
                <div className="question-views">· 조회수 {data.viewCount}</div>
              </div>
            </div>
            <div>
              <Separator />
            </div>
            <div>
              <Comments qaId={questionId} />
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1024px] mx-auto text-xl flex justify-between">
          <Link
            className="w-full"
            to={`/question/${questionId}/answers/editor`}
          >
            <Button className="w-full">답변하기</Button>
          </Link>
        </div>
        <div className="w-full max-w-[1024px] mx-auto text-xl flex justify-between">
          <div>총 {data.answers.length}개의 답변이 있어요.</div>
        </div>
        <div className="flex flex-col gap-5 justify-stretch">
          {data.answers.map((e) => (
            <Answer
              key={e.id}
              id={e.id}
              nickname={e.writer.name}
              profile={e.writer.profile}
              content={e.content}
              isOwner={e.writer.id === userId}
              editUrl={`/question/${questionId}/answers/${e.id}/editor`}
              className="w-full max-w-[1024px] mx-auto border rounded-md px-4 py-4 flex flex-col gap-4"
              onDeleteHandler={() => {
                onDeleteHandler(e.id);
              }}
            />
          ))}
        </div>
      </div>
      <footer className="main-footer"></footer>
    </div>
  );
}

export default QA;
