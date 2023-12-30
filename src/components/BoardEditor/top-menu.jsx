import { Button } from "../ui/button";
import { Input } from "../ui/input";

const TopMenu = ({ boardType, setTitle, title, saveBoard }) => {
  return (
    <div className="w-full h-10 flex items-center">
      {boardType === "question" ? (
        <Input
          className="h-10 flex-1 outline-none"
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      ) : (
        <div className="flex-1 ml-3">답변</div>
      )}

      <Button
        className="h-8 rounded-none float-right w-15 bg-green-600 font-bold"
        onClick={saveBoard}
      >
        등록
      </Button>
    </div>
  );
};

export default TopMenu;
