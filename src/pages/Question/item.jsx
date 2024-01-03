import { Link } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

export default function QuestionItem({
  id,
  title,
  viewCount,
  answers,
  writer,
  profile,
  like,
}) {
  return (
    <div className="p-4 max-w-5xl mx-auto mt-6 border border-solid rounded-lg bg-white shadow-md hover:shadow-lg transition duration-300">
      <div className="flex-1">
        <div className="text-lg font-semibold mb-2">
          <Link to={`/questions/${id}`} className="text-gray-600 hover:underline">
            {title}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <img
              src={profile}
              alt="user-profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="gap-4">{writer}</div>
          <div>·</div>
          <div className="text-gray-600">조회수 {viewCount}</div>
          <div>·</div>
          <div className="flex items-center gap-1">
            <IoChatbubbleEllipsesOutline className="text-gray-600" />
            <div>{answers}</div>
          </div>
          <div>·</div>
          <div className="flex items-center gap-1">
            <CiHeart className="text-gray-600 w-5 h-5" />
            <div className="text-gray-600">{like.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
