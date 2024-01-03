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
}) {
  return (
    <div className="border rounded-md p-3 flex justify-between relative">
      <div className="text-xl font-bold p-8">
        <h2>{name}</h2>
      </div>
      <div className="gap-7 m">
        <p>{postalCode}</p>
        <p>{address}</p>
        <p>{industry}</p>
      </div>
      <div className="mr-20">
        <p>{industryCode}</p>
        <p>가입번호: {registrationNumber}</p>
        <p>평점: {companyNpsEmployeeData}</p>
      </div>
      <p className="text-xs absolute bottom-1 right-2">조회수: {}</p>
    </div>
  )
}