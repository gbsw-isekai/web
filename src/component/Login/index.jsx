import { useState } from "react"
import { login } from "../../lib/login";
import Cookies from "js-cookie";

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
    const { data } = await login(info);
    Cookies.set('access_token', data);
  }

  return (
    <div>
      <form onSubmit={sendInfo}>
        <div>
          <input type="text" placeholder="로그인" style={{
            border: "1px solid black"
          }}
            name="id"
            value={info.id}
            onChange={onChange} />
        </div>
        <div>
          <input type="password" placeholder="비밀번호" style={{
            border: "1px solid black"
          }}
            name="pw"
            value={info.pw}
            onChange={onChange} />
        </div>
        <div>
          <button style={{
            border: "1px solid black"
          }}>
            로그인하기
          </button>
        </div>
      </form>
    </div>
  )
} 