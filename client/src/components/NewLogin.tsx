import { Button, TextField } from "@mui/material";
import React from "react";
import { authTokenAtom, emailAtom, passwordAtom } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

const NewLogin = () => {
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [autToken, setAuthToken] = useRecoilState(authTokenAtom);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/users/login/", {
        email: email,
        password: password,
      });
      setAuthToken(res.data.token);
      sessionStorage.setItem("token", res.data.token);
      console.table(res.data);
    } catch (error) {
      console.error("An error has occured: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-[45vh] relative">
      <div className="grid m-2">
        <input
          className="input input-bordered mb-2"
          id="password"
          placeholder="E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        ></input>
        <input
          placeholder="Password"
          className="input input-bordered"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        ></input>
        <button className="btn btn-accent mt-5" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default NewLogin;
