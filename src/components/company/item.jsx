import React from "react";

export default function CompanyItem({
  id,
  name,
  postalCode,
  address,
  industryCode,
  industry,
  registrationNumber,
  companyNpsEmployeeData,
  viewCount
}) {
  return (
    <div className="relative border rounded-md p-3 flex">
      <div className="text-xl font-bold p-8 flex-1">
        <h2>{name}</h2>
      </div>
      <div className="gap-7 flex-1 pr-5">
        <p>{postalCode}</p>
        <p>{address}</p>
        <p>{industry}</p>
      </div>
      <div className="flex-1 pl-5 pr-5 m-0">
        <p>{industryCode}</p>
        <p>가입번호: {registrationNumber}</p>
        <p>평점: {companyNpsEmployeeData}</p>
      </div>
      <div className="absolute right-2 bottom-1">
        <p className="text-xs font-extralight">조회수: {viewCount}</p>
      </div>
    </div>
  )
}