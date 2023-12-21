import axios from "axios";

export function signUp(request) {
  const data = axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER}/auth/signUp`,
    data: request,
  });

  return data;
}