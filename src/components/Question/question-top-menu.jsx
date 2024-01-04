import { List, Rows } from "lucide-react";
import { Link } from "react-router-dom";

const QuestionTopMenu = ({
  orderType,
  setOrderType,
  viewType,
  setViewType,
}) => {
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

  return (
    <div className="mx-auto w-full max-w-5xl flex py-3 border-b justify-between">
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
      <ul className="flex gap-2">
        {orderTypes.map((e, idx) => (
          <li className="flex gap-2 text-gray-600">
            {idx != 0 ? "·" : ""}
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
    </div>
  );
};

export default QuestionTopMenu;
