import WelcomeMessage from "../components/WelcomeMessage";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignupModal";
import LoginIcon from "@mui/icons-material/Login";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Dialog } from "@mui/material";

const LandingPage = () => {
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const [signedUp, setSignedUp] = useState(false);

  const handleLogIn = () => {
    setOpenLogIn(true);
  };

  const handleSignUp = () => {
    setOpenSignUp(true);
  };
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <WelcomeMessage></WelcomeMessage>
      <div style={{ display: "flex", gap: "16px" }}>
        
        <Button variant="contained" sx={{ m: 2 }} onClick={handleLogIn}>
          Log In <LoginIcon></LoginIcon>
        </Button>

        <Dialog open={openLogIn} onClose={handleCloseLogIn}>
          <LoginModal setShow={setOpenLogIn}></LoginModal>
        </Dialog>

        <h2>OR</h2>

        <Button variant="contained" sx={{ m: 2 }} onClick={handleSignUp}>
          Sign Up <RocketLaunchIcon></RocketLaunchIcon>
        </Button>

        <Dialog open={openSignUp} onClose={handleCloseSignUp}>
         {signedUp? <LoginModal setShow={setOpenLogIn}></LoginModal> : <SignUpModal show={openSignUp} setShow={setOpenSignUp} signedUp={signedUp} setSignedUp={setSignedUp}></SignUpModal> } 
        </Dialog>

      </div>
    </div>
  );
};

export default LandingPage;
