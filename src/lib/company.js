import axios from "axios";

export async function getCompanys(pageId, query, size) {
  const { data } = await axios({
    method: "GET",
    url: `${
      process.env.REACT_APP_SERVER
    }/companies?query=${query}&page=${pageId}&size=${
      size ?? 10
    }&sort=latestEmployeeCount,desc`,
  });
  return data;
}

export async function getCompany(id) {
  const { data } = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/companies/${id}`,
  });
  return data;
}

export async function getCompanyComment(id) {
  const { data } = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/companies/${id}/comments`,
  });
  return data;
}

export function createCompanyComment(id, data, token) {
  const response = axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER}/companies/${id}/comments`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  }).catch((err) => {
    return err;
  });

  return response;
}

export async function companyViewCount(companyId, token) {
  const response = axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER}/companies/${companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((err) => {
    return err;
  });

  return response;
}

export function createCompanyReview(id, data, token) {
  const response = axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER}/companies/${id}/reviews`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  }).catch((err) => {
    return err;
  });

  return response;
}
