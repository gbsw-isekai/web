import { Link } from "react-router-dom/dist";

function Answer({ nickname, content, isOwner, editUrl }) {
  return (
    <div className="border-y-2 border-gray-500">
      <div className="answer-profile_info">
        <div className="flex justify-between">
          <div className="answer-info_right">
            <div className="mb-2">{nickname}</div>
            <div className="flex gap-2 mb-4">
              <div className="answer-definition">채택답변수 4,341</div>
              <div className="answer-thanks">· 받은감사수 35</div>
              <div className="answer-layer">태양신</div>
            </div>
          </div>
          <div className="answer-info_left">answer-profile</div>
        </div>
        <div className="answer-content whitespace-pre-line">{content}</div>
        {isOwner ? <Link to={editUrl}>수정하기</Link> : null}
      </div>
    </div>
  );
}
export default Answer;
