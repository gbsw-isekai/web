function Answer({ nickname, content }) {
  return (
    <div className="answer-container">
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
        <div className="answer-content">{content}</div>
      </div>
    </div>
  );
}
export default Answer;
