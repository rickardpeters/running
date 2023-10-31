import { Container } from "@mui/material";
import StravaCard from "../components/userpage/StravaCard";
import ChallengeList from "../components/userpage/Challenge/ChallengeList";
import JoinedCommunities from "../components/userpage/JoinedCommunities";

const UserPage = () => {
  return (
    <div className="grid grid-flow-row">
      <JoinedCommunities />
      <StravaCard />
      <ChallengeList />
    </div>
  );
};

export default UserPage;
