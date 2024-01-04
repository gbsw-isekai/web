import useToken from "src/hooks/useToken";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { deleteCompanyComment } from "src/lib/company";

export default function CompanyCommentList({ comments, companyId }) {
  const [token, userId] = useToken();

  const handleDeleteClick = async (commentId) => {
    try {
      await deleteCompanyComment(companyId, commentId, token);
      alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      {comments.map((comment) => (
        <div className="border px-4 py-2 rounded-md relative">
          {comment.content}
          <div className="text-sm mt-1">{comment.writer.name}</div>
          {userId === comment.writer.id ? (
            <div className="absolute top-2 right-2">
              <Button
                type="submit"
                variant="destructive"
                onClick={() => handleDeleteClick(comment.id)}
              >
                삭제
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
      {comments.length === 0 ? (
        <div className="border px-4 py-2 rounded-md text-sm h-20">
          첫 댓글을 입력해주세요!
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
