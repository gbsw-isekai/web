import axios from "axios";

const URL = process.env.REACT_APP_SERVER;

export const fetcher = (url) => axios.get(URL + url).then((res) => res.data);

export const tokenFetcher = (token) => {
  return (url) =>
    axios
      .get(URL + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
};
