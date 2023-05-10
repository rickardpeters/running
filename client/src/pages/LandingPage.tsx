import WelcomeMessage from '../components/WelcomeMessage';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignupModal';
import LoginIcon from '@mui/icons-material/Login';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Button from '@mui/material/Button';
import { useState } from 'react';

const LandingPage = () => {
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleLogIn = () => {
    setOpenLogIn(true);
  };

  const handleSignUp = () => {
    setOpenSignUp(true);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}>
      <WelcomeMessage></WelcomeMessage>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant='contained' sx={{ m: 2 }} onClick={handleLogIn}>
          Log In <LoginIcon></LoginIcon>
        </Button>
        <LoginModal show={openLogIn} setShow={setOpenLogIn}></LoginModal>
        <h2>OR</h2>
        <Button variant='contained' sx={{ m: 2 }} onClick={handleSignUp}>
          Sign Up <RocketLaunchIcon></RocketLaunchIcon>
        </Button>
        <SignUpModal show={openSignUp} setShow={setOpenSignUp}></SignUpModal>
      </div>
    </div>
  );
};

export default LandingPage;
