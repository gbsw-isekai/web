import axios from "axios";

export function signUp(request) {
  const data = axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER}/users/join`,
    data: request,
  });

  return data;
}