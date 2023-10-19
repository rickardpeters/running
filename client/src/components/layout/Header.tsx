import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import SignOutButton from "../LogSign/SignOutButton";
import { useContext } from "react";
import { Context } from "../auth/AuthContextProvider";
import AuthHeader from "./AuthHeader";
import UnAuthHeader from "./UnAuthHeader";

interface HeaderProps {
  auth: boolean;
}

const Header = (props: HeaderProps) => {
  return <>{props.auth ? <AuthHeader /> : <UnAuthHeader />}</>;
};

export default Header;
