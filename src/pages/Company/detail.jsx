import React from "react";
import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { useNavigate, useParams } from "react-router-dom/dist";
import { getCompany } from "src/lib/company";

export default function Detail() {
  const navigate = useNavigate();
  const [token, userId] = useToken();

  useEffect(() => {
    if (!token || !userId) {
      alert("로그인을 하셔야 회사 정보를 조회할 수 있습니다.");
      navigate("/auth/login");
    }
  }, [token, userId, navigate]);

  const [company, setCompany] = useState("");
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { companiesId } = useParams();

  useEffect(() => {
    async function wait() {
      try {
        setLoad(true);
        const company = await getCompany(companiesId);
        setCompany(company);

        // if (!company || Object.keys(company).length === 0) {
        //
        //   setErrorMessage("조회할 회사가 존재하지 않습니다.");
        //   setError(true);
        // } else {
        //   setCompany(company);
        // }
      } catch (err) {
        setErrorMessage(`${err}`);
        setError(true);
      } finally {
        setLoad(false);
      }
    }
    wait();
  }, [companiesId]);

  if (load) {
    return "조회중" + errorMessage;
  }

  if (error) {
    return "ERROR STATE: [" + errorMessage + "]";
  }

  return (
    <div>
      <div>{company.name}</div>
      <div>{company.postalCode}</div>
      <div>{company.address}</div>
      <div>{company.industryCode}</div>
      <div>{company.industry}</div>
      <div>{company.registrationNumber}</div>
      <div>{company.companyNpsEmployeeData}</div>
      <div>{company.viewCount}</div>
    </div>
  );
}
