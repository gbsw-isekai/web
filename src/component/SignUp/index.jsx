import React, { useState } from "react";
import { signUp } from "../../lib/signUp";
import Cookies from "js-cookie";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
      "id": "",
      "name": "",
      "pw": "",
      "number": ""
  })

  const onChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function sendInfo(e) {
    e.preventDefault();
    const { data } = await signUp(userInfo);
    Cookies.set('access_token', data);
  }

  return(
    <div className="container">
      <form onSubmit={sendInfo}>
        <div className="">
          <input type="text" placeholder="userId" className="border" name="id" value={userInfo.id} onChange={onChange}/>
        </div>
        <div className="">
          <input type="text" placeholder="userName" className="border" name="name" value={userInfo.name} onChange={onChange}/>
        </div>
        <div className="">
          <input type="password" placeholder="password" className="border" name="pw" value={userInfo.pw} onChange={onChange}/>
        </div>
        <div className="">
          <input type="text" placeholder="phoneNum" className="border" name="number" value={userInfo.number} onChange={onChange}/>
        </div>
        <div className="">
          <button className="border">submit</button>
        </div>
      </form>
    </div>
  ) 
}