import React, { useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLoginRequest() {
    const reqBody = {
      userName: userName,
      userPassword: userPassword,
    };

    fetch("http://localhost:8080/authenticate", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject("Invalid login attempt");
        }
      })
      .then((body) => {
        const token = body.jwtToken;

        if (token) {
          setJwt(token);
          window.location.href = "/dashboard";
        } else {
          return Promise.reject("Token not found in the response");
        }
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <>
      <div>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="userPassword">Password</label>
        <input
          type="password"
          id="userPassword"
          value={userPassword}
          onChange={(e) => setuserPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" id="submit" onClick={sendLoginRequest}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
