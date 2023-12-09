import axios from "axios"

export function getQuestions() {
  const data = axios({
    method: 'get',
    url: `${process.env.REACT_APP_SERVER}/boards`,
  });

  return data;
}