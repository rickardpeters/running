import { Button } from "@mui/base";
import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Context } from "../auth/AuthContextProvider";
import { authTokenAtom } from "../../recoil/authAtoms";
import { onScreenAlertAtom } from "../../recoil/atoms";

const SignOutButton = () => {
  const authToken = useRecoilValue(authTokenAtom);
  const user = useContext(Context);
  const uid = user.user.uid;
  const token = user.user.token;
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

  const handleSignOut = async () => {
    await signOutFromDjango()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const signOutFromDjango = async () => {
    await axios
      .post("http://127.0.0.1:8000/users/logout/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // First sign out from django, then from firebase
        setAlert({
          showSnack: true,
          snackColor: "info",
          snackMessage: "Signed Out",
        });
        signOut(auth);
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: "Unable to sign out.",
        });
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
