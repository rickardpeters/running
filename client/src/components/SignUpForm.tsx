import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(email);
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(password);
    setPassword(e.target.value);
  };

  const signUp = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
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
          type="email"
          id="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmail}
        ></input>
        <input
          placeholder="Password"
          className="input input-bordered"
          type="password"
          value={password}
          onChange={handlePassword}
        ></input>
        <button className="btn btn-accent mt-5" onClick={signUp}>
          SignUp
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default SignUpForm;
