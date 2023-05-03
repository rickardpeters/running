import { Button } from '@mui/material';
import WelcomeMessage from '../components/WelcomeMessage';
import LoginIcon from '@mui/icons-material/Login';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const LandingPage = () => {
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
        <Button variant='contained' sx={{ m: 2 }}>
          Sign In <LoginIcon></LoginIcon>
        </Button>
        <h2>OR</h2>
        <Button variant='contained' sx={{ m: 2 }}>
          Join Now <RocketLaunchIcon></RocketLaunchIcon>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
