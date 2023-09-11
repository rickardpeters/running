import { UserAuth } from "./auth/AuthContextProvider";
import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "./auth/AuthContextProvider";
import LogoutIcon from "@mui/icons-material/Logout";

const SignOutButton = () => {
  const { logOut } = UserAuth();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await logOut();
      sessionStorage.removeItem("token");
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
