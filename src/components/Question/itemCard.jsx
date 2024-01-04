import { Link } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function QuestionItemCard({
  id,
  title,
  viewCount,
  answers,
  writer,
  profile,
  like,
  content,
  createdAt,
}) {
  return (
    <div className="px-4 py-8 max-w-5xl mx-auto border-b border-solid bg-white hover:shadow-lg transition duration-300">
      <div className="flex flex-col gap-2">
        <Link to={`/questions/${id}`}>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold hover:underline">{title}</div>
            <div className="text-gray-500 h-6 overflow-hidden text-ellipsis whitespace-nowrap">
              {content.replace(/<[^>]*>?/g, "")}
            </div>
          </div>
        </Link>

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
          <div>·</div>
          <div>{dayjs(createdAt).fromNow()}</div>
        </div>
      </div>
    </div>
  );
}
