import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom/dist";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";

function Answer({
  nickname,
  content,
  isOwner,
  editUrl,
  className,
  onDeleteHandler,
}) {
  return (
    <div className={`bg-white ${className} px-4 py-8`}>
      <div>
        <div className="flex justify-between">
          <div className="w-full">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-slate-500 rounded-full"></div>
              <div className="ml-2">{nickname}</div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 mt-3">
                <div className="answer-definition">채택답변수 4,341</div>
                <div className="answer-thanks">· 받은감사수 35</div>
                <div className="answer-layer">태양신</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {isOwner ? (
                    <>
                      <DropdownMenuItem>
                        <Link to={editUrl}>수정하기</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div onClick={onDeleteHandler}>삭제하기</div>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem>
                      <Link to={``}>신고하기</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-4 ml-[51px]"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
export default Answer;
