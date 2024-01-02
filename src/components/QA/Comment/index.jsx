import { useCallback, useEffect, useState } from "react";
import CommentItem from "./item";
import { getComments } from "../../../lib/question";
import CommentForm from "./Form";
import useToken from "src/hooks/useToken";

export default function Comments({ qaId }) {
  const [comments, setComments] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [token, userId] = useToken();

  // const commentList = comments.map(({
  //   id,
  //   title,
  //   content
  // }) => (
  //   <CommentItem key={id} id={id} title={title} content={content} />
  // ))

  const refreshComments = useCallback(async () => {
    try {
      setLoad(true);
      const comments = await getComments(qaId);
      setComments(comments);
    } catch (error) {
      setError(true);
    } finally {
      setLoad(false);
    }
  }, [qaId]);

  useEffect(() => {
    refreshComments();
  }, [refreshComments]);

  if (load) {
    return "조회중";
  }

  if (error) {
    return "에러 발생";
  }

  return (
    <div className="w-full flex flex-col items-start gap-3">
      <CommentForm qaId={qaId} onCreate={refreshComments} token={token} />
      <div className="w-full flex flex-col items-start gap-4">
        {comments.map(({ id, writer, content, createdAt }, i) => (
          <CommentItem
            key={id}
            id={id}
            qaId={qaId}
            nickname={writer.name}
            profile={writer.profile}
            content={content}
            token={token}
            isOwner={writer.id === userId}
            onCreate={refreshComments}
            createdAt={createdAt}
          />
        ))}
      </div>
      {/* {commentList} */}
    </div>
  );
}
