import axios from "axios";

export async function getCompanys() {
  const {data} = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_SERVER}/companies`
  });
  return data;
};

export async function getCompany(id) {
  const {data} = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_SERVER}/companies/${id}`
  });
  return data;
}