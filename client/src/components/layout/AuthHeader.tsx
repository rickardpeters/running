import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../LogSign/SignOutButton";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoIcon from "@mui/icons-material/Info";

const AuthHeader = () => {
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content w-100 relative">
        <Link to="/">
          <div className="btn btn-ghost px-[2vw] rounded-md">
            <HomeIcon className="scale-150" />
          </div>
        </Link>
        <Link to="/UserPage">
          <div className="btn btn-ghost rounded-md">
            <DirectionsRunIcon className="scale-125" />
          </div>
        </Link>
        <Link to="/communityList">
          <div className="btn btn-ghost rounded-md">
            <GroupsIcon className="scale-125" />
          </div>
        </Link>
        <Link to="/About">
          <div className="btn btn-ghost rounded-md">
            <InfoIcon className="scale-125" />
          </div>
        </Link>
        <div className="absolute right-0 p-[5vw]">
          <SignOutButton></SignOutButton>
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
