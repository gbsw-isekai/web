import { useState } from "react"
import { createComment } from "../../../../lib/question";

export default function CommentForm({qaId, onCreate }) {
  const [commentDto, setCommentDto] = useState({
    content: '',
  });

  const onChange = (e) => {
    setCommentDto((prev) => ({
      ...prev,
      content: e.target.value,
    }))
  }

  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  async function sendCommentDto(e) {
    try {
      setLoad(true);
      e.preventDefault();

      await createComment(qaId, commentDto);
  
      setCommentDto({
        content: '',
      })
  
      onCreate();
    } catch(error) {
      setError(true);
    } finally {
      setLoad(false);
    }
  }

  if (load) {
    return "load...";
  }

  if (error) {
    return "error"
  }

  return(
    <div>
      <form onSubmit={sendCommentDto}>
       <textarea
          style={{
          border: '1px solid black',
          width: '400px',
          height: '200px'
        }}
        value={commentDto.content}
        onChange={onChange}
      >
      </textarea>
      <button>작성하기</button>
      </form>
    </div>
  )
}