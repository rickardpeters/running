import { Container } from "@mui/material";

import JoinedCommunities from "../components/userpage/JoinedCommunities";
import StravaCard from "../components/StravaCard";
import ChallengeList from "../components/Challenge/ChallengeList";

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
