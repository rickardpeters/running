import SignUpForm from "../components/LogSign/SignUpForm";
import WelcomeMessage from "../components/WelcomeMessage";
import { Container } from "@mui/material";
const LandingPage = () => {
  return (
    <Container>
      <WelcomeMessage></WelcomeMessage>
      <SignUpForm></SignUpForm>
    </Container>
  );
};

export default LandingPage;
