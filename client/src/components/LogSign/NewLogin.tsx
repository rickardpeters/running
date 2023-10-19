import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const NewLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const logIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        navigate("/homePage");
      })
      .catch((error) => {
        console.log(error);
      });
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
        <button className="btn btn-accent mt-5" onClick={logIn}>
          Login
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default NewLogin;
