import axios from "axios";

export async function getCompanys(pageId, searchKey) {
  const {data} = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER}/companies/pages/${pageId}`,
    searchKey
  });
  return data;
};

export async function getCompany(id) {
  const {data} = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER}/companies/${id}`
  });
  return data;
}

export async function companyViewCount(companyId, token) {
  const response = axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER}/${companyId}/views`,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).catch((err) => {
    return err;
  });

  return response;
}