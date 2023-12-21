import { useEffect, useState } from "react";
import { createBoard, getBoardById, updateBoard } from "../../lib/api";
import useToken from "../../hooks/useToken";
import { useNavigate, useParams } from "react-router-dom/dist";

const BoardEditor = ({ type }) => {
  const navigate = useNavigate();
  const [token, userId] = useToken();
  useEffect(() => {
    if (!token || !userId) {
      alert("로그인 ㄱㄱ");
      navigate("/login");
    }
  }, [token, userId]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { questionId, answerId } = useParams();
  const [boardType, setBoardType] = useState("question");
  const [isNew, setIsNew] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type == 3 || type == 4) setBoardType("answer");

    if (type == 2 || type == 4) setIsNew(false);
  }, []);

  useEffect(() => {
    if (!isNew) {
      (async () => {
        const id = boardType == "question" ? questionId : answerId;

        const data = await getBoardById(id);

        if (data.data.writer.id != userId) {
          navigate(`/question/${questionId}`);
        }

        console.log(data);
        if (boardType == "question") setTitle(data.data.title);
        setContent(data.data.content);

        setIsLoading(true);
      })();
    }
  }, [isNew]);

  const onClickHandler = async () => {
    const data =
      boardType == "question"
        ? {
            title,
            content,
          }
        : {
            content,
            questionId,
          };

    if (!isNew && boardType == "question") {
      data["id"] = questionId;
    } else {
      data["id"] = answerId;
    }

    const response = isNew
      ? await createBoard(data, token)
      : await updateBoard(data, token);

    if (response.status != 200) {
      return console.log("에러");
    }

    navigate(
      `/question/${boardType == "question" ? response.data.id : questionId}`
    );
  };

  if (!isNew && !isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="max-w-[1024px] mx-auto flex flex-col">
      <div className="flex items-center justify-between h-8">
        <span className="text-2xl">
          {boardType == "question" ? "질문" : "답변"}
        </span>
        {boardType == "question" ? (
          <input
            type="text"
            className="h-full ml-3 flex-auto outline-none border-2 border-black pl-1"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : null}
      </div>
      <div className="w-full h-96 border-2 border-black mt-5">
        <textarea
          className="w-full h-full resize-none p-1 outline-none"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="flex justify-center mt-2">
        <button
          className="border-2 border-black px-5 py-1"
          onClick={onClickHandler}
        >
          게시
        </button>
      </div>
    </div>
  );
};

export default BoardEditor;
