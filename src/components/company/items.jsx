import React from "react";
import { Link } from "react-router-dom";
import CompanyItem from "./item";

export default function Items({ companys }) {
  console.log(companys);
  return (
    <div className="flex flex-col gap-2">
      {companys.map(
        ({
          id,
          name,
          postalCode,
          address,
          industryCode,
          industry,
          registrationNumber,
          averageYearPrice,
          employeeCount,
          viewCount,
        }) => (
          <Link to={`/companies/${id}`} key={id} id="list">
            <CompanyItem
              id={id}
              name={name}
              postalCode={postalCode}
              address={address}
              industryCode={industryCode}
              industry={industry}
              registrationNumber={registrationNumber}
              averageYearPrice={averageYearPrice}
              employeeCount={employeeCount}
              viewCount={viewCount}
            />
          </Link>
        )
      )}
    </div>
  );
}
