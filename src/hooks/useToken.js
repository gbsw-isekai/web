import { useCookies } from "react-cookie";

export default function useToken() {
  const [cookies] = useCookies();

  return cookies["access_token"];
}
