import React from "react";
import { useEffect, useState } from "react";

export default function CompanyItem({
  id,
  name,
  stack,
  grade,
  averageSalary,
  viewsCount
}) {
  return (
    <div className="border rounded-md p-3 flex">
      <div className="text-xl font-bold p-5">
        <h2>{name}</h2>
      </div>
      <div>
        <p>선호 기술: {stack}</p>
        <p>평점: {grade}</p>
        <p>연봉: {averageSalary}</p>
        <p>{viewsCount}</p>
        <p>고유번호: {id}</p>
      </div>
    </div>
  )
}