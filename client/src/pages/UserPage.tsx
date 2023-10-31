import { Container } from "@mui/material";
import StravaCard from "../components/userpage/StravaCard";
import ChallengeList from "../components/userpage/Challenge/ChallengeList";
import JoinedCommunities from "../components/userpage/JoinedCommunities";

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
      <JoinedCommunities />
      <StravaCard />
      <ChallengeList />
    </Container>
  );
};

export default UserPage;
