import useToken from "src/hooks/useToken";
import { Button } from "../ui/button";
import { deleteCompanyComment } from "src/lib/company";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function CompanyCommentList({ comments, companyId }) {
  const [token, userId] = useToken();
  const [update, setUpdate] = useState(false);
  const [commentIdx, setCommentIdx] = useState();
  const scrollDivRef = useRef(null);

  const updateComment = (commentId) => {
    setUpdate(true);
    setCommentIdx(commentId);
  };

  const deleteComment = async (commentId) => {
    try {
      await deleteCompanyComment(companyId, commentId, token);
      alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  useEffect(() => {
    scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight;
  }, []);

  return (
    <div
      className="flex flex-col gap-2 relative border-t-2 h-72 overflow-y-auto"
      ref={scrollDivRef}
    >
      {comments.map((comment) =>
        update && commentIdx === comment.id ? (
          <div className="px-4 py-2 relative">
            <div className="flex gap-4">
              <span className="text-sm">{comment.writer.name}</span>
              <span className="text-xs pt-1 text-gray-400">
                {comment.createdAt.slice(0, 10)}
              </span>
            </div>
            <div
              className="border rounded-md pl-3 pr-3 pt-2 pb-2 text-sm"
              //여기
            >
              <input>{comment.content}</input>
            </div>
          </div>
        ) : (
          <div className="px-4 py-2 relative">
            <div className="flex gap-4">
              <span className="text-sm">{comment.writer.name}</span>
              <span className="text-xs pt-1 text-gray-400">
                {comment.createdAt.slice(0, 10)}
              </span>
              {userId === comment.writer.id ? (
                <span className=" pt-0.5 h-4">
                  <DropdownMenu className="border-black">
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-4 w-4 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem>
                        <Button
                          className="w-f self-center"
                          variant="ghost"
                          onClick={() => updateComment(comment.id)}
                        >
                          수정하기
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          className="w-full text-left"
                          type="submit"
                          variant="ghost"
                          onClick={() => deleteComment(comment.id)}
                        >
                          삭제
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              ) : (
                ""
              )}
            </div>
            <div
              className="border rounded-md pl-3 pr-3 pt-2 pb-2 text-sm"
              style={{
                width: `${
                  comment.content.length > 49
                    ? (comment.content.length / 49) * 150
                    : comment.content.length * 20
                }px`,
                height: `${
                  comment.content.length > 49
                    ? (comment.content.length / 49) * 30
                    : 40
                }px`,
              }}
              //여기
            >
              <span>{comment.content}</span>
            </div>
          </div>
        )
      )}
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
