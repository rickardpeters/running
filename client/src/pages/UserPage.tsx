import "../App.css";
import { Container } from "@mui/material";
import StravaCard from "../components/StravaCard";
import ChallengeList from "../components/Challenge/ChallengeList";

const UserPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "10px",
        justifyContent: "center",
      }}
    >
      <StravaCard />
      <ChallengeList />
    </Container>
  );
};

export default UserPage;
