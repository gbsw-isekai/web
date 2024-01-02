import axios from "axios";

export function signUp(request, token) {
  const data = axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER}/auth/join`,
    data: request,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
