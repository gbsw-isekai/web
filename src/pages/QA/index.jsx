import { useEffect, useState } from "react";
import Answer from "../../components/QA/answer";

import { useNavigate, useParams } from "react-router-dom/dist";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useToken from "../../hooks/useToken";
import Header from "src/components/common/Header";
import { Separator } from "src/components/ui/separator";
import { Button } from "src/components/ui/button";

import "dayjs/locale/ko";
import Comments from "../../components/QA/Comment";
import { createView, deleteBoard, getBoardById } from "src/lib/question";
import QADropDown from "src/components/QA/qa-dropdown";
import { Toaster } from "src/components/ui/toaster";
import BoardLike from "src/components/QA/board-like";
import { toast } from "src/components/ui/use-toast";
import { ToastAction } from "src/components/ui/toast";
dayjs.extend(relativeTime);
dayjs.locale("ko");

function QA() {
  const initData = {
    title: "Loading",
    content: "Loading",
    writer: {
      id: "Loading",
      name: "Loading",
      profile: "https://picpac.kr/common/img/default_profile.png",
    },
    createdAt: "Loading",
    viewCount: "Loading",
    answers: [],
    like: [],
    isLoading: false,
  };

  const [token, userId] = useToken();
  const [data, setData] = useState(initData);
  const { questionId } = useParams();
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const createView_ = async () => {
    try {
      await createView(questionId, token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    createView_();
  }, [questionId, token]);

  const getData = async () => {
    const getData = await getBoardById(questionId);

    if (!!token) {
      if (userId === getData.data.writer.id) getData.data["isOwner"] = true;
      else getData.data["isOwner"] = false;
    }
    setData({ ...getData.data, isLoading: true });
  };

  useEffect(() => {
    getData();
  }, [questionId, token, userId]);

  const onDeleteHandler = async (questionId_) => {
    try {
      await deleteBoard(questionId_, token);

      if (questionId_ === questionId) {
        return navigate("/questions");
      }

      getData();
    } catch (err) {
      toast({
        title: "게시글 삭제 실패",
        description: "다시 시도해 주세요",
        variant: "destructive",
      });
    }
  };

  const onClickShowCommentsBtn = () => {
    setShowComments(!showComments);
  };

  const onClickAnswerBtnHandler = () => {
    if (!token) {
      toast({
        title: "로그인이 필요한 서비스 입니다.",
        description: "로그인 후 다시 시도해 주세요",
        variant: "destructive",
        action: (
          <ToastAction
            altText="로그인 페이지로 이동"
            onClick={() => navigate("/auth/login")}
          >
            로그인 페이지로 이동
          </ToastAction>
        ),
      });

      return;
    }

    navigate(`/questions/${questionId}/editor`);
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-full flex flex-col gap-5 py-8">
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
                onEditHandler={() => {
                  navigate(`/questions/${questionId}/editor`);
                }}
              />
            </div>
            <div
              className="text-pretty"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <div className="w-full flex justify-between text-sm text-gray-700">
              <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full overflow-hidden">
                    <img src={data.writer.profile} alt="프로필사진" />
                  </div>
                  <div className="question-name">{data.writer.name}</div>
                  <div className="question-date">
                    · {dayjs(data.createdAt).fromNow()}
                  </div>
                  <div className="question-views">
                    · 조회수 {data.viewCount}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="cursor-pointer"
                    onClick={onClickShowCommentsBtn}
                  >
                    댓글
                  </div>
                  {data.isLoading ? (
                    <BoardLike qaId={questionId} count={data.like.length} />
                  ) : null}
                </div>
              </div>
            </div>
            {showComments ? (
              <>
                <div>
                  <Separator />
                </div>
                <div>
                  <Comments qaId={questionId} />
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="w-full max-w-[1024px] mx-auto text-xl flex justify-between">
          <Button className="w-full" onClick={onClickAnswerBtnHandler}>
            답변하기
          </Button>
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
              onEditHandler={() => {
                navigate(`/questions/${questionId}/answers/${e.id}/editor`);
              }}
              className="w-full max-w-[1024px] mx-auto border rounded-md px-4 py-4 flex flex-col gap-4"
              onDeleteHandler={() => {
                onDeleteHandler(e.id);
              }}
              createdAt={e.createdAt}
              likeCtn={e.like.length}
            />
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default QA;
