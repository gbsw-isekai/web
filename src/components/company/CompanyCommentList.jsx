export default function CompanyCommentList({ comments }) {
  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => (
        <div className="border px-4 py-2 rounded-md">
          {comment.content}
          <div className="text-sm mt-1">{comment.writer.name}</div>
        </div>
      ))}
      {comments.length == 0 ? (
        <div className="border px-4 py-2 rounded-md text-sm h-20">
          첫 댓글을 입력해주세요!
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
