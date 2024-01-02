import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const QADropDown = ({ isOwner, onDeleteHandler, editUrl, onEditHandler }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <MoreVertical className="text-gray-700 " />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isOwner ? (
          <>
            {onEditHandler ? (
              <DropdownMenuItem onClick={onEditHandler}>
                <div>수정하기</div>
              </DropdownMenuItem>
            ) : null}

            <DropdownMenuItem onClick={onDeleteHandler}>
              <div className="text-red-600">삭제하기</div>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Link to={``}>신고하기</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QADropDown;
