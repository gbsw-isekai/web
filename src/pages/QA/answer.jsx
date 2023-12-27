import { Link } from "react-router-dom/dist";

function Answer({ nickname, content, isOwner, editUrl, className }) {
  return (
    <div className={`bg-white ${className} px-3 py-2`}>
      <div>
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-slate-500 rounded-full"></div>
              <div className="ml-2">{nickname}</div>
            </div>
            <div className="flex gap-2 mt-3">
              <div className="answer-definition">채택답변수 4,341</div>
              <div className="answer-thanks">· 받은감사수 35</div>
              <div className="answer-layer">태양신</div>
            </div>
            {isOwner ? <Link to={editUrl}>수정하기</Link> : null}
          </div>
        </div>
      </div>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
export default Answer;
