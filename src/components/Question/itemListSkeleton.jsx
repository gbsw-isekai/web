import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Skeleton } from "../ui/skeleton";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function QuestionItemListSkeleton() {
  return (
    <div className="px-4 py-8 w-full max-w-5xl mx-auto border-b border-solid bg-white hover:shadow-lg transition duration-300">
      <div className="flex justify-between w-full h-full">
        <div className="flex-1 h-7 overflow-hidden w-full max-w-xl">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 flex-1 max-w-xs">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-64 h-8" />
        </div>
      </div>
    </div>
  );
}
