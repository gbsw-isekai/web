import React, { useEffect, useState } from "react";
import { signUp } from "../../lib/signUp";
import Cookies from "js-cookie";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useToken from "src/hooks/useToken";
import { toast } from "src/components/ui/use-toast";
import { Toaster } from "src/components/ui/toaster";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    pw: "",
    number: "",
    profile: "",
  });

  const [token] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!token) {
      navigate(-1);
    }
  }, [token]);

  const onChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function sendInfo(e) {
    e.preventDefault();
    try {
      const { data } = await signUp(userInfo, token);
      Cookies.set("access_token", data);

      navigate("/");
    } catch (err) {
      toast({
        title: "회원가입 실패!",
        description: "다시 시도해 주세요",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-xs">
        <form onSubmit={sendInfo}>
          <div className="text-center text-2xl font-bold mb-7">
            Join in to GbswJob
          </div>
          <div className="mb-1.5">
            <Input
              type="text"
              placeholder="아이디"
              className="border"
              name="id"
              value={userInfo.id}
              onChange={onChange}
            />
          </div>
          <div className="mb-1.5">
            <Input
              type="text"
              placeholder="이름"
              className="border"
              name="name"
              value={userInfo.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-1.5">
            <Input
              type="password"
              placeholder="비밀번호"
              className="border"
              name="pw"
              value={userInfo.pw}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="전화번호"
              className="border"
              name="number"
              value={userInfo.number}
              onChange={onChange}
            />
          </div>
          <div>
            <Button className="w-full max-w-xs h-12 text-base font-bold">
              회원가입
            </Button>
          </div>
          <div className="text-center flex justify-center items-center mt-7">
            <div className="mr-1">계정이 존재합니까?</div>
            <Link
              to="/auth/login"
              className="text-blue-700 font-medium text-base hover:underline"
            >
              로그인
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
