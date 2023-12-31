import React, { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import axios from "axios";
import { authTokenAtom } from "../../recoil/authAtoms";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setPassword(e.target.value);
  };

  const signUp = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        signInToDjango(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signInToDjango = async (user: any) => {
    const token = user.user.accessToken;
    setAuthToken(token);

    await axios
      .post(
        "http://127.0.0.1:8000/users/login/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        //If the django auth fails, the user has to be logged out from firebase
        // The order has to be firebase ->django since we need the auth token
        console.error(e);
        signOut(auth);
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
          onChange={handleEmail}></input>
        <input
          placeholder="Password"
          className="input input-bordered"
          type="password"
          value={password}
          onChange={handlePassword}></input>
        <button className="btn btn-accent mt-5" onClick={signUp}>
          SignUp
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default SignUpForm;
