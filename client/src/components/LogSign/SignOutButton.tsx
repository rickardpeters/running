import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRecoilValue } from "recoil";
import { authTokenAtom } from "../../recoil/atoms";

const SignOutButton = () => {
  const navigate = useNavigate();

  const authToken = useRecoilValue(authTokenAtom);

  const handleSignOut = async () => {
    try {
      await signOutFromDjango();
    } catch (error) {
      console.log(error);
    }
  };

  const signOutFromDjango = async () => {
    await fetch("http://127.0.0.1:8000/users/logout/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(() => {
        // First sign out from django, then from firebase
        signOut(auth);
        //navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
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
