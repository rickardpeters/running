import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../LogSign/SignOutButton";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";

const AuthHeader = () => {
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content w-100 relative">
        <div className="btn btn-ghost px-[2vw]">
          <HomeIcon className="scale-150" />
        </div>
        <div className="btn btn-ghost">
          <Link to="/UserPage">
            <DirectionsRunIcon className="scale-125" />
          </Link>
        </div>
        <div className="btn btn-ghost">
          <Link to="/communityList">
            <GroupsIcon className="scale-125" />
          </Link>
        </div>
        <div className="absolute right-0 p-[5vw]">
          <SignOutButton></SignOutButton>
        </div>
      </div>
    </>
  );
};

export default AuthHeader;
