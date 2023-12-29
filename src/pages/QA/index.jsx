import { useEffect, useState } from "react";
import Answer from "./answer";

import { createView, deleteBoard, getBoardById } from "../../lib/api";
import { Link, useNavigate, useParams } from "react-router-dom/dist";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useToken from "../../hooks/useToken";
import Header from "src/components/common/Header";

import {
  MessageCircle,
  MessageCircleMore,
  MessageCircleQuestion,
  MoreVertical,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import "dayjs/locale/ko";
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
      <div className="w-full min-h-[calc(100vh-56.67px)] bg-gray-200">
        <div className="flex flex-col w-full min-h-full bg-white py-8">
          <div className="flex flex-col w-full max-w-[1024px] self-center">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircleQuestion className="w-10 h-10" />
                <div className="ml-2 text-2xl">{data.title}</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {data.isOwner ? (
                    <>
                      <DropdownMenuItem>
                        <Link to={`/question/${questionId}/editor`}>
                          수정하기
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div
                          onClick={() => {
                            onDeleteHandler(questionId);
                          }}
                        >
                          삭제하기
                        </div>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem>
                      <Link to={``}>신고하기</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-32 h-whitespace-nowrap break-all">
            <div
              className="mb-5 ml-[51px] h-whitespace-nowrap break-all"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            </div>
            <div className="my-6">
              <a href="/" className="text-blue-800">
                고등학교진학
              </a>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-400"></div>
                <div className="question-name">{data.writer.id}</div>
                <div className="question-date">
                  · {dayjs(data.createdAt).fromNow()}
                </div>
                <div className="question-views">· 조회수 {data.viewCount}</div>
              </div>
              <div className="flex gap-2">
                <div className="">
                  <MessageCircle />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1024px] mx-auto my-4 text-xl flex justify-between">
          <div>A {data.answers.length}개</div>
          <Link
            to={`/question/${questionId}/answers/editor`}
            className="px-3 py-1 bg-green-500 text-white text-base"
          >
            답변하기
          </Link>
        </div>
        <div>
          {data.answers.map((e) => (
            <Answer
              key={e.id}
              nickname={e.writer.id}
              content={e.content}
              isOwner={e.writer.id === userId}
              editUrl={`/question/${questionId}/answers/${e.id}/editor`}
              className="max-w-[1024px] mx-auto my-8"
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
