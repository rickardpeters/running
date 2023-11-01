import { Container } from "@mui/material";
import StravaCard from "../components/StravaCard";
import ChallengeList from "../components/Challenge/ChallengeList";
import JoinedCommunities from "../components/userpage/JoinedCommunities";

const UserPage = () => {
  return (
    <div className="grid grid-flow-row lg:grid-cols-4 md:grid-cols-1 bg-slate-200">
      <div>
        <JoinedCommunities />
      </div>
      <div className="col-span-3">
        <StravaCard />
        <ChallengeList />
      </div>
    </div>
  );
};

export default UserPage;
