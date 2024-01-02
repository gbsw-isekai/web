import React from "react";
import { useEffect, useState } from "react";
import { getCompanys } from "src/lib/company";
import Header from "src/components/common/Header";
import CompanyItem from "src/pages/Company/components/item";
import { Link } from "react-router-dom";

export default function CompanyList() {
  const [companys, setCompanys] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function wait() {
      try {
        setLoad(true);
        const companys = await getCompanys();
        setCompanys(companys);
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
      <div>
        <Header/>
      </div>
      <div className="max-w-3xl mx-auto">
        {companys.map(({
          id,
          name,
          postalCode,
          address,
          industryCode,
          industry,
          registrationNumber,
          companyNpsEmployeeData,
          viewCount
        }) => (
          <Link to={`/companies/${id}`}>
            <CompanyItem 
              id={id} 
              name={name} 
              postalCode={postalCode} 
              address={address} 
              industryCode={industryCode} 
              industry={industry} 
              registrationNumber={registrationNumber} 
              companyNpsEmployeeData={companyNpsEmployeeData}
              viewCount={viewCount}
            />
          </Link>
        ))}
      </div>
    </div>
	)
}
