import React from "react";
import { Briefcase, MapPin } from "lucide-react";

export default function CompanyItem({
  name,
  address,
  industry,
  registrationNumber,
  averageYearPrice,
  employeeCount,
  viewCount,
}) {
  return (
    <div className="relative border rounded-md px-4 py-4 flex flex-col gap-2">
      <div className="text-xl font-bold ">
        <h2>{name}</h2>
      </div>
      <div className="flex-1 flex gap-4 text-sm">
        <div className="flex items-center">
          <Briefcase size={20} strokeWidth={1.75} className="mr-1" />{" "}
          {industry.replaceAll("그 외 기타", "")}
        </div>
        <div className="flex items-center">
          <MapPin size={20} strokeWidth={1.75} className="mr-1" />
          {address.split(" ")[0]}
        </div>
      </div>
      <div className="text-sm">
        <p>
          총 평균 연봉: {new Intl.NumberFormat().format(averageYearPrice)}원
        </p>
        <p>총 직원 수: {new Intl.NumberFormat().format(employeeCount)}명</p>
      </div>
      <div className="absolute right-2 bottom-1">
        <p className="text-xs font-extralight">조회수: {viewCount}</p>
      </div>
    </div>
  );
}
