import axios from "axios";

export function getMyAccount(token) {
  const data = axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/users/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
