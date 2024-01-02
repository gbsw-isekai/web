import { useEffect, useState } from "react";
import { createComment, updateComment } from "../../../../lib/question";
import useToken from "src/hooks/useToken";
import { Textarea } from "src/components/ui/textarea";
import { Button } from "src/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CommentForm({
  qaId,
  onCreate,
  token,
  commentId,
  content,
}) {
  const [commentDto, setCommentDto] = useState({
    content: "",
  });

  const onChange = (e) => {
    setCommentDto((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const [isNew, setIsNew] = useState(true);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [isConentLoad, setIsConentLoad] = useState(false);
  const [formPlaceholder, setFormPlaceholer] = useState("로그인이 필요합니다.");

  useEffect(() => {
    if (commentId) {
      setCommentDto({ content });

      setIsNew(false);
      setIsConentLoad(true);
    }

    if (token) {
      setFormPlaceholer("댓글을 입력하세요.");
    }
  }, [qaId, commentId]);

  async function sendCommentDto(e) {
    try {
      e.preventDefault();

      if (!token) {
        navigate("/auth/login");
      }

      setLoad(true);

      isNew
        ? await createComment(qaId, commentDto, token)
        : await updateComment(qaId, commentId, commentDto, token);

      setCommentDto({
        content: "",
      });

      onCreate();
    } catch (error) {
      setError(true);
    } finally {
      setLoad(false);
    }
  }

  if (load) {
    return "load...";
  }

  if (!isNew && !isConentLoad) {
    return "load...";
  }

  if (error) {
    return "error";
  }

  return (
    <div className="w-full">
      <form
        onSubmit={sendCommentDto}
        className="w-full flex flex-col items-start gap-3"
      >
        <Textarea
          placeholder={formPlaceholder}
          onChange={onChange}
          defaultValue={commentDto.content}
        />
        <Button>등록</Button>
      </form>
    </div>
  );
}