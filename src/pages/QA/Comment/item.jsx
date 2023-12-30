import { useState } from "react";
import QADropDown from "src/components/QA/qa-dropdown";
import CommentForm from "./Form";
import { deleteComment } from "src/lib/question";

export default function CommentItem({
  id,
  nickname,
  profile,
  isOwner,
  content,
  qaId,
  token,
  onCreate,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const onEditHandeler = () => {
    setIsEdit(true);
  };

  const onDeleteHandler = async () => {
    await deleteComment(qaId, id, token);

    onCreate();
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-start justify-between">
        <div className="flex gap-2 items-end">
          <div className="w-5 h-5 rounded-full overflow-hidden">
            <img src={profile} alt="프로필사진" className="w-full h-full" />
          </div>
          <div>{nickname}</div>
        </div>
        <QADropDown
          isOwner={isOwner}
          onEditHandler={onEditHandeler}
          onDeleteHandler={onDeleteHandler}
        />
      </div>
      {isEdit ? (
        <CommentForm
          qaId={qaId}
          commentId={id}
          content={content}
          token={token}
          onCreate={onCreate}
        />
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
}
