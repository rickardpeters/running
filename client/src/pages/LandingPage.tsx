<<<<<<< HEAD


import WelcomeMessage from "../components/WelcomeMessage";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignupModal";
=======
import WelcomeMessage from '../components/WelcomeMessage';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignupModal';
>>>>>>> d411d6140ecfe73c40e7526fda6efd7a30affa75

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
        <LoginModal></LoginModal>
        <h2>OR</h2>
        <SignUpModal></SignUpModal>
      </div>
    </div>
  );
};

export default LandingPage;
