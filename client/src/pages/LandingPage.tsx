import WelcomeMessage from "../components/WelcomeMessage";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignupModal";
import LoginIcon from "@mui/icons-material/Login";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box, Container, Dialog, styled } from "@mui/material";
import headerimg from "../img/headerimg.png";

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
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        placeItems: "center",
        backgroundImage: `url(${headerimg})`,
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
          {signedUp ? (
            <LoginModal setShow={setOpenLogIn}></LoginModal>
          ) : (
            <SignUpModal
              show={openSignUp}
              setShow={setOpenSignUp}
              signedUp={signedUp}
              setSignedUp={setSignedUp}
            ></SignUpModal>
          )}
        </Dialog>
      </div>
    </Container>
  );
};

export default LandingPage;
