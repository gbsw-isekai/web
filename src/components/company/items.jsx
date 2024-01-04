import React from "react";
import { Link } from "react-router-dom";
import CompanyItem from "./item";

export default function Items({companys}) {
  return (
    <>
      {companys.map(({
      id,
      name,
      postalCode,
      address,
      industryCode,
      industry,
      registrationNumber,
      viewCount
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
          viewCount={viewCount}
        />
      </Link>
    ))}
    </>
  )
}