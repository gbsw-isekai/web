import React from "react";

export default function CompanyComment({ companyId, companyName, userId }) {
  return (
    <div className="mt-8">
      <div className="border border-gray-300 p-3 h-96 overflow-y-auto">
        <div className="text-2xl pt-3 pb-4">댓글</div>
        <div className="relative border border-gray-300 p-4 h-72 flex flex-wrap content-cente ">
          <div className="absolute bottom-2 cente border rounded-lg border-gray-300 h-16 w-11/12 overflow-y-auto">
            <p className="absolute left-2 top-1">{userId}</p>
            <textarea className="absolute w-10/12 h-7 bottom-1 left-2 focus:outline-none overflow-y-auto"></textarea>
            <button className="absolute border border-gray-300 rounded-sm top-5 right-4 h-7 w-12">
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
