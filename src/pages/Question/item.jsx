import { Link } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";


export default function QuestionItem({
  id,
  title,
  viewCount,
  answers,
  writer,
  profile,
}) {
  return (
    <div className="p-4 max-w-5xl mx-auto mt-6 border border-solid rounded-xl flex items-center">
      <div className="flex-1">
          <div className="text-base md:text-lg lg:text-xl mb-3">
            <Link to={`/question/${id}`} className="text-black hover:underline">
              {title}
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <img src={profile} alt="user-profile" className="w-5 h-5 rounded-full"/>
            </div>
            <div className="flex gap-3">
              <div className="text-sm text-gray-600">
                {writer}
              </div>
              <div className="text-sm text-gray-600">
                조회수 {viewCount}
              </div>
              <div  className="flex items-center gap-1">
                <div className="text-sm text-gray-600">
                  <IoChatbubbleEllipsesOutline />
                </div>
                <div className="text-sm text-gray-600">
                  {answers}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}