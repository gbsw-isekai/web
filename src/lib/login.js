import axios from "axios";

export function login(request) {
  const data = axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER}/auth/login`,
    data: request,
  });

  return data;
}
