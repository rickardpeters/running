import { Button } from "@mui/base";
import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Context } from "../auth/AuthContextProvider";
import { onScreenAlertAtom } from "../../recoil/atoms";

const SignOutButton = () => {
  const user = useContext(Context);
  const token = user.user.accessToken;
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

  const handleSignOut = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/users/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        signOut(auth);
        setAlert({
          showSnack: true,
          snackColor: "info",
          snackMessage: "Signed Out",
        });
      })
      .catch(() => {
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
