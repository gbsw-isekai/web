import axios from "axios";
import useToken from "../hooks/useToken";

export function getQuestions() {
  const data = axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER}/boards`,
  });

  return data;
}

export function getQuestionById(id) {
  const data = axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER}/boards/${id}`,
  });

  return data;
}

export function createQuestion(data, token) {
  const request = axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER}/boards`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data,
  });

  return request;
}