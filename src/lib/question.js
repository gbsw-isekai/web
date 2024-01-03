import axios from "axios";

import Cookies from "js-cookie";

export async function getQuestions() {
  const { data } = await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER}/boards/questions`,
  });
  return data;
}

export function getBoardById(id) {
  const data = axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/boards/${id}`,
  });

  return data;
}

export function createBoard(data, token) {
  const response = axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER}/boards`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  }).catch((err) => {
    return err;
  });

  return response;
}

export function updateBoard(data, token) {
  const response = axios({
    method: "PUT",
    url: `${process.env.REACT_APP_SERVER}/boards`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });

  return response;
}

export function deleteBoard(boardId, token) {
  const response = axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_SERVER}/boards/${boardId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export function createView(boardId, token) {
  const response = axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER}/boards/${boardId}/views`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function getComments(id) {
  const { data } = await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER}/boards/${id}/comments`,
  });
  return data;
}

export async function createComment(qaId, commentDto) {
  const { data } = await axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER}/boards/${qaId}/comments`,
    data: commentDto,
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  });
  return data;
}

export async function updateComment(qaId, id, commentDto, token) {
  const { data } = await axios({
    method: "put",
    url: `${process.env.REACT_APP_SERVER}/boards/${qaId}/comments/${id}`,
    data: commentDto,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function deleteComment(qaId, id, token) {
  const { data } = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_SERVER}/boards/${qaId}/comments/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function createLike(qaId, token) {
  const { data } = await axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER}/boards/${qaId}/likes/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function deleteLike(qaId, token) {
  const { data } = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_SERVER}/boards/${qaId}/likes/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function getIsLikeByBoard(qaId, token) {
  const { data } = await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER}/boards/${qaId}/likes/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
