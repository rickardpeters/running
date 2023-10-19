import { Context } from "./auth/AuthContextProvider";
import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SignOutButton = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      navigate("/");
      console.log("logged out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={handleSignOut} color="inherit" component="button">
        <LogoutIcon></LogoutIcon>
      </Button>
    </>
  );
};

export default SignOutButton;
