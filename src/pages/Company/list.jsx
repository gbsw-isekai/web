import React from "react";
import { useEffect, useState } from "react";
import { getCompanys } from "src/lib/companyList";
import Header from "src/components/common/Header";
import CompanyDetail from "./detail";
import CompanyItem from "src/components/Company/item";

export default function CompanyList() {
  const [companys, setCompanys] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function wait() {
      try {
        setLoad(true)
        const companys = await getCompanys()
        setCompanys(companys)
      } catch {
        setError(true)
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
      <div>
        <Header/>
      </div>
      <div className="max-w-2xl mx-auto">
        {companys.map(({
          id,
          name,
          stack,
          grade,
          averageSalary,
          viewsCount
        }) => (
          <div><CompanyItem id={id} name={name} stack={stack} grade={grade} averageSalary={averageSalary} viewsCount={viewsCount}/></div>
        ))}
      </div>
    </div>
	)
}
