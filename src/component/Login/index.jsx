import { useState } from "react"
import { login } from "../../lib/login";
import Cookies from "js-cookie";
import { Input } from "../../components/ui/input"
import { Button } from "@radix-ui/themes";

export default function Login() {


  const [info, setInfo] = useState({
    id: '',
    pw: '',
  })

  function onChange(e) {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function sendInfo(e) {
    e.preventDefault();
    try {
      const { data } = await login(info);
      Cookies.set('access_token', data);
    } catch(error) {
      alert ("로그인 실패:", error);
    }
  }

  return (
    <div>
      <form onSubmit={sendInfo}>
        <div>
          <Input type="text" placeholder="로그인"
            name="id"
            value={info.id}
            onChange={onChange} />
        </div>
        <div> 
          <Input type="password" placeholder="비밀번호" style={{
            border: "1px solid black"
          }}
            name="pw"
            value={info.pw}
            onChange={onChange} />
        </div>
        <div>
          <Button style={{
            border: "1px solid black"
          }}>
            로그인하기
          </Button>
        </div>
      </form>
    </div>
  )
} 