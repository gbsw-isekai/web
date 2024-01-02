import QADropDown from "src/components/QA/qa-dropdown";
import Comments from "./Comment";
import { Separator } from "src/components/ui/separator";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");

function Answer({
  id,
  nickname,
  profile,
  content,
  isOwner,
  onEditHandler,
  className,
  onDeleteHandler,
  createdAt,
}) {
  const [showComments, setShowComments] = useState(false);

  const onClickShowCommentsBtn = () => {
    setShowComments(!showComments);
  };

  return (
    <div className={`bg-white ${className}`}>
      <div>
        <div className="flex justify-between">
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img src={profile} alt="프로필사진" />
                </div>
                <div className="ml-2">{nickname}</div>
              </div>
              <QADropDown
                isOwner={isOwner}
                onDeleteHandler={onDeleteHandler}
                onEditHandler={onEditHandler}
              />
            </div>
            <div className="flex justify-between items-center w-full text-gray-700 text-sm">
              <div>
                <div>{dayjs(createdAt).fromNow()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <div className="w-full flex justify-end">
        <div className="cursor-pointer" onClick={onClickShowCommentsBtn}>
          댓글
        </div>
      </div>
      {showComments ? (
        <>
          <Separator />
          <Comments qaId={id} />
        </>
      ) : null}
    </div>
  );
}
export default Answer;
