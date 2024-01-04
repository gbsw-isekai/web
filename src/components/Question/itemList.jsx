import { Link } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function QuestionItemList({
  id,
  title,
  viewCount,
  answers,
  writer,
  profile,
  like,
  createdAt,
}) {
  return (
    <div className="px-4 py-8 max-w-5xl mx-auto border-b border-solid bg-white hover:shadow-lg transition duration-300">
      <div className="flex justify-between">
        <Link
          className="flex-1 h-7 overflow-hidden max-w-xl"
          to={`/questions/${id}`}
        >
          <div className="text-lg font-semibold hover:underline overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </div>
        </Link>
        <div className="flex items-center justify-between text-sm text-gray-600 flex-1 max-w-xs">
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
          <div className="w-16 text-center">{dayjs(createdAt).fromNow()}</div>
        </div>
      </div>
    </div>
  );
}
