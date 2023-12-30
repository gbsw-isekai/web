import { useEffect, useState } from "react";
import { createComment, updateComment } from "../../../../lib/question";
import useToken from "src/hooks/useToken";
import { Textarea } from "src/components/ui/textarea";
import { Button } from "src/components/ui/button";

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

  const [isNew, setIsNew] = useState(true);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [isConentLoad, setIsConentLoad] = useState(false);

  useEffect(() => {
    if (commentId) {
      setCommentDto({ content });

      setIsNew(false);
      setIsConentLoad(true);
    }
  }, [qaId, commentId]);

  async function sendCommentDto(e) {
    try {
      setLoad(true);
      e.preventDefault();

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
          placeholder="댓글을 입력하세요."
          onChange={onChange}
          defaultValue={commentDto.content}
        />
        <Button>등록</Button>
      </form>
    </div>
  );
}
