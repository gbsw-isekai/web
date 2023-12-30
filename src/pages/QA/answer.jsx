import QADropDown from "src/components/QA/qa-dropdown";

function Answer({
  nickname,
  profile,
  content,
  isOwner,
  editUrl,
  className,
  onDeleteHandler,
}) {
  return (
    <div className={`bg-white ${className}`}>
      <div>
        <div className="flex justify-between">
          <div className="w-full">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img src={profile} alt="프로필사진" />
              </div>
              <div className="ml-2">{nickname}</div>
              <div className="flex-1"></div>
              <QADropDown
                isOwner={isOwner}
                onDeleteHandler={onDeleteHandler}
                editUrl={editUrl}
              />
            </div>
            <div className="flex justify-between items-center w-full text-gray-700 text-sm">
              <div className="flex gap-2 mt-3">
                <div className="answer-definition">채택답변수 4,341</div>
                <div className="answer-thanks">· 받은감사수 35</div>
                <div className="answer-layer">태양신</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
export default Answer;
