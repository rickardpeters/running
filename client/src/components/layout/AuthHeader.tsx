import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../LogSign/SignOutButton";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HomeIcon from "@mui/icons-material/Home";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const AuthHeader = () => {
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content w-100 relative">
        <a className="btn btn-ghost normal-case text-xl">RunNerds</a>
        <div className="absolute right-0 p-[5vw]">
          <SignOutButton></SignOutButton>
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
