import axios from "axios"

import Cookies from "js-cookie";

export async function getQuestions() {
  const {data} = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_SERVER}/boards`,
  });
  return data;
}

export async function getComments(id) {
  const {data} = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_SERVER}/boards/${id}/comments`
  });
  return data;
}

export async function createComment(qaId, commentDto) {
  const {data} = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_SERVER}/boards/${qaId}/comments`,
    data: commentDto,
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  });
  return data;
}