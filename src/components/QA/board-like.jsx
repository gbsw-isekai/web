import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "src/hooks/useToken";
import { createLike, deleteLike, getIsLikeByBoard } from "src/lib/question";

const BoardLike = ({ qaId, count }) => {
  const [isLike, setIsLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useToken();
  const [likeCnt, setLikeCount] = useState(count);
  const navigate = useNavigate();

  const getData = async () => {
    const getIsLike = await getIsLikeByBoard(qaId, token);

    setIsLike(getIsLike);
    setIsLoading(true);
  };

  const onClickLikeHandler = async () => {
    try {
      if (!isLoading) return;

      if (!token) {
        alert("로그인 ㄱㄱ");
        navigate("/auth/login");
      }

      if (isLike) {
        await deleteLike(qaId, token);
        setIsLike(false);
        setLikeCount(likeCnt - 1);
      } else {
        await createLike(qaId, token);
        setIsLike(true);
        setLikeCount(likeCnt + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="flex items-center gap-1">
      <Heart
        className={`cursor-pointer text-gray-500 text-sm ${
          isLike ? "text-red-600 fill-red-600" : ""
        }`}
        onClick={onClickLikeHandler}
      />
      <div className="text-xs min-w-[10px] text-center">{likeCnt}</div>
    </div>
  );
};

export default BoardLike;
