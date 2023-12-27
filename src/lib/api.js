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

export function getQuestions() {
  const data = axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/boards`,
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
