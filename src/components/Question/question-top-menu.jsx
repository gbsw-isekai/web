import { List, Rows } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useToken from "src/hooks/useToken";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

const QuestionTopMenu = ({
  orderType,
  setOrderType,
  viewType,
  setViewType,
}) => {
  const [token] = useToken();
  const navigate = useNavigate();

  const orderTypes = [
    {
      name: "최근순",
      code: "latest",
    },
    {
      name: "답변많은순",
      code: "answers",
    },
    {
      name: "조회수순",
      code: "views",
    },
  ];

  const onClickWriteBtnHandler = () => {
    if (!token) {
      toast({
        title: "로그인이 필요한 서비스 입니다.",
        description: "로그인 후 다시 시도해 주세요",
        variant: "destructive",
        action: (
          <ToastAction
            altText="로그인 페이지로 이동"
            onClick={() => navigate("/auth/login")}
          >
            로그인 페이지로 이동
          </ToastAction>
        ),
      });

      return;
    }

    navigate("/questions/editor");

    return;
  };

  return (
    <div className="mx-auto w-full max-w-5xl flex items-center py-3 border-b justify-between">
      <ul className="flex gap-2">
        <li>
          <Link to={`/questions?view=list&order=${orderType}`}>
            <List
              className={viewType === "list" ? "text-black" : "text-gray-400"}
            />
          </Link>
        </li>
        <li>
          <Link to={`/questions?view=card&order=${orderType}`}>
            <Rows
              className={viewType === "card" ? "text-black" : "text-gray-400"}
            />
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-5">
        <ul className="flex gap-2">
          {orderTypes.map((e, idx) => (
            <li key={e.code} className="flex gap-2 text-gray-600">
              {idx !== 0 ? "·" : ""}
              <Link to={`/questions?view=${viewType}&order=${e.code}`}>
                <div
                  className={`cursor-pointer ${
                    orderType === e.code ? "text-black font-semibold" : ""
                  }`}
                >
                  {e.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={onClickWriteBtnHandler}
        >
          게시글 작성
        </Button>
      </div>
    </div>
  );
};

export default QuestionTopMenu;
