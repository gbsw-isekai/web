import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("access_token");
    navigate("/", { replace: true });
  }, []);
};

export default Logout;
