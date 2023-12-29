import { useEffect, useState } from "react";
import { login } from "../../lib/login";
import Cookies from "js-cookie";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nagivate = useNavigate();

  const [info, setInfo] = useState({
    id: "",
    pw: "",
  });

  function onChange(e) {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function sendInfo(e) {
    e.preventDefault();
    const { data } = await login(info);
    Cookies.set("access_token", data);
    nagivate(-1);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-xs">
        <form onSubmit={sendInfo}>
          <div className="text-center text-2xl font-bold mb-7">
            Login in to GbswJob
          </div>
          <div>
            <Input
              type="text"
              placeholder="로그인"
              className="mb-1.5"
              name="id"
              value={info.id}
              onChange={onChange}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="비밀번호"
              className="mb-4"
              name="pw"
              value={info.pw}
              onChange={onChange}
            />
          </div>
          <div>
            <Button className="w-full max-w-xs h-12 text-base font-bold">
              로그인
            </Button>
          </div>
          <div className="text-center flex justify-center items-center mt-7">
            <div className="mr-1">계정이 존재하지 않습니까?</div>
            <Link
              to="/users/join"
              className="text-blue-700 font-medium text-base hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
