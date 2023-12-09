import { useCallback, useEffect, useState } from "react"
import CommentItem from "./item";
import { getComments } from "../../../lib/question";
import CommentForm from "./Form";

export default function Comments({
  qaId
}) {
  const [comments, setComments] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);

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
      const comments = await getComments(qaId)
    setComments(comments)
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
    return '조회중'
  }

  if (error) {
    return '에러 발생'
  }

  return (
    <div>
      <CommentForm qaId={qaId} onCreate={refreshComments} />
      <div>
      { comments.map(({
       id,
      title,
      content
     }) => (
      <CommentItem key={id} id={id} title={title} content={content} />
    ))}
    </div>
      {/* {commentList} */}
    </div>
  )
}