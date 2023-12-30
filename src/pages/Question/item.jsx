import { Link } from "react-router-dom";

export default function QuestionItem({
  id,
  title,
  name,
  viewCount
}) {
  return (
    <div className="p-4 max-w-5xl h-32 mx-auto mt-7 flex gap-3 items-center border border-solid rounded-xl">
      <div>
        {name}
      </div>  
      <div>
        {viewCount}회
      </div>
      <div className="font-normal">
        <Link to={`/question/${id}`}>{title}</Link>
      </div>
    </div>
  )
}