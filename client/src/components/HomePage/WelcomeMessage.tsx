import React, { useState } from "react";
import runningImage from "../../img/headerimg.png";
import { Dialog } from "@mui/material";
import LoginModal from "../LogSign/LoginModal";
import SignUpModal from "../LogSign/SignupModal";
import LoginIcon from "@mui/icons-material/Login";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useRecoilState } from "recoil";
import { openSignUpAtom } from "../../recoil/authAtoms";

const WelcomeMessage = () => {
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useRecoilState(openSignUpAtom);
  const [signedUp, setSignedUp] = useState(false);

  const handleLogIn = () => {
    setOpenLogIn(true);
  };

  const handleSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };
  return (
    <div
      className="hero min-h-screen max-h-100 w-100 absolute top-0"
      style={{
        backgroundImage: `url(${runningImage})`,
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">Fellow runners,</h1>
          <p className="mb-5 text-2xl">Let's run!</p>
          <button className="btn btn-info rounded-md mx-2" onClick={handleLogIn}>
            Log In <LoginIcon></LoginIcon>
          </button>
          <button className="btn btn-info rounded-md mx-2" onClick={handleSignUp}>
            Sign Up <RocketLaunchIcon></RocketLaunchIcon>
          </button>
        </div>

        <Dialog open={openLogIn} onClose={handleCloseLogIn}>
          <LoginModal setShow={setOpenLogIn}></LoginModal>
        </Dialog>

        <SignUpModal signedUp={signedUp} setSignedUp={setSignedUp} />
      </div>
    </div>
  );
};

export default WelcomeMessage;
