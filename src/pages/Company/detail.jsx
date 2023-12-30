import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { getCompany } from "src/lib/company";

export default function Detail() {
  const [company, setCompany] = useState("");
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const { companiesId } = useParams();

  useEffect(() => {
    async function wait() {
      try {
        setLoad(true);
        const company = await getCompany(companiesId);
        setCompany(company);
      } catch {
        setError(true);
      } finally {
        setLoad(false);
      }
    }
    wait();
  }, []);

  if (load) {
    return '조회중'
  }

  if(error) {
    return '에런데용?'
  }
  
	return (
    <div>
      <div>{company.name}</div>
      <div>{company.stack}</div>
      <div>{company.grade}</div>
      <div>{company.averageSalary}</div>
      <div>{company.viewsCount}</div>
      <div>{company.id}</div>
    </div>
	)
}
