import React from "react";
import { useEffect, useState } from "react";

export default function CompanyItem({
  id,
  name,
  stack,
  grade,
  genre,
  area,
  averageSalary,
  viewsCount
}) {
  return (
    <div className="border rounded-md p-3 flex justify-between relative">
      <div className="text-xl font-bold p-8">
        <h2>{name}</h2>
      </div>
      <div className="gap-7 m">
        <p>{genre}</p>
        <p>{area}</p>
        <p>선호 기술: {stack}</p>
      </div>
      <div className="mr-20">
        <p>평점: {grade}</p>
        <p>연봉: {averageSalary}</p>
        <p>평점: {grade}</p>
      </div>
      <p className="text-xs absolute bottom-1 right-2">조회수: {viewsCount}</p>
    </div>
  )
}