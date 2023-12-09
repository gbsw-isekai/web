import axios from "axios"

export async function getQuestions() {
  const {data} = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_SERVER}/boards`,
  });

  return data;
}