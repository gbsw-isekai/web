import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Skeleton } from "@radix-ui/themes";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function QuestionItemCardSkeleton() {
  return (
    <div className="px-4 py-8 max-w-5xl mx-auto border-b border-solid bg-white hover:shadow-lg transition duration-300">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-96 h-7" />
        <Skeleton className="w-80 h-5" />
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          <Skeleton className="w-60 h-5" />
        </div>
      </div>
    </div>
  );
}
