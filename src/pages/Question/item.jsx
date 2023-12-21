import { Link } from "react-router-dom";

export default function QuestionItem({
  id,
  title,
  content
}) {
  return (
    <div>
      <div>
        {id}
      </div>  
      <div>
       <Link to={`/questions/${id}`}>{title}</Link>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}