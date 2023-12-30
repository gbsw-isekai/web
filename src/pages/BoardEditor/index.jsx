import { useEffect, useState } from "react";
import { createBoard, getBoardById, updateBoard } from "../../lib/question";
import useToken from "../../hooks/useToken";
import { useNavigate, useParams } from "react-router-dom/dist";
import Header from "src/components/common/Header";
import Editor from "src/components/BoardEditor/editor";
import TopMenu from "src/components/BoardEditor/top-menu";
import { useToast } from "src/components/ui/use-toast";
import { Toaster } from "src/components/ui/toaster";

const BoardEditor = ({ type }) => {
  const navigate = useNavigate();
  const [token, userId] = useToken();
  const { toast } = useToast();

  useEffect(() => {
    if (!token || !userId) {
      alert("로그인 ㄱㄱ");
      navigate("/auth/login");
    }
  }, [token, userId, navigate]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { questionId, answerId } = useParams();
  const [boardType, setBoardType] = useState("question");
  const [isNew, setIsNew] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === "3" || type === "4") setBoardType("answer");

    if (type === "2" || type === "4") {
      setIsNew(false);
    }
  }, [type]);

  useEffect(() => {
    if (!isNew) {
      (async () => {
        const id = boardType === "question" ? questionId : answerId;

        const data = await getBoardById(id);

        if (data.data.writer.id !== userId) {
          navigate(`/question/${questionId}`);
        }

        if (boardType === "question") setTitle(data.data.title);
        setContent(data.data.content);

        setIsLoading(true);
      })();
    }
  }, [isNew, answerId, boardType, navigate, questionId, userId]);

  const saveBoard = async () => {
    if ((title === "" && boardType === "question") || content === "") {
      toast({
        title: "게시글 등록 실패!",
        description: "제목 또는 내용을 확인해주세요.",
        variant: "destructive",
      });

      return;
    }

    const data =
      boardType === "question"
        ? {
            title,
            content,
          }
        : {
            content,
            questionId,
          };

    if (!isNew && boardType === "question") {
      data["id"] = questionId;
    } else {
      data["id"] = answerId;
    }

    const response = isNew
      ? await createBoard(data, token)
      : await updateBoard(data, token);

    if (response.status !== 200) {
      toast({
        title: "게시글 등록 실패!",
        description: "다시 시도해 주세요",
        variant: "destructive",
      });

      return;
    }

    navigate(
      `/question/${boardType === "question" ? response.data.id : questionId}`
    );
  };

  if (!isNew && !isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <TopMenu
        boardType={boardType}
        setTitle={setTitle}
        title={title}
        saveBoard={saveBoard}
      />
      <Editor htmlStr={content} setHtmlStr={setContent} />
      <Toaster />
    </div>
  );
};

export default BoardEditor;
