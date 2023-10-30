import { Container } from "@mui/material";
import StravaCard from "../components/StravaCard";
import ChallengeList from "../components/Challenge/ChallengeList";

const UserPage = () => {
  return (
    <div className="grid grid-flow-row">
      <StravaCard />
      <ChallengeList />
    </div>
  );
};

export default UserPage;
