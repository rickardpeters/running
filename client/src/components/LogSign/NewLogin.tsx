import React, { useState } from "react";
import {
  User,
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import { authTokenAtom } from "../../recoil/atoms";

const NewLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  const navigate = useNavigate();

  const logIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        signInToDjango(user);
        navigate("/homePage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInToDjango = async (user: any) => {
    const token = user.user.accessToken;
    setAuthToken(token);

    fetch("http://127.0.0.1:8000/users/login/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
      //If the django auth fails, the user has to be logged out from firebase
      // The order has to be firebase ->django since we need the auth token
      console.log(e);
      signOut(auth);
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
