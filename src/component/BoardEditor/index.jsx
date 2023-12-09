import { useState } from "react";
import { createQuestion } from "../../lib/api";
import useToken from "../../hooks/useToken";
import { useNavigate, useRoutes } from "react-router-dom/dist";

const BoardEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = useToken();
  const navigate = useNavigate();

  const onClickHandler = async () => {
    const data = {
      title,
      content,
    };

    const request = await createQuestion(data, token);

    if (request.status != 200) {
      return console.log("에러");
    }

    navigate(`/qa/${request.data.id}`);
  };

  return (
    <div className="max-w-[1024px] mx-auto flex flex-col">
      <div className="flex items-center justify-between h-8">
        <span className="text-2xl">질문</span>
        <input
          type="text"
          className="h-full ml-3 flex-auto outline-none border-2 border-black pl-1"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
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
