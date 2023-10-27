import Box from "@mui/material/Box";
import CommunityCard from "./Community/CommunityCard";
import ChallengeCard from "./Challenge/ChallengeCard";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 300,
        m: 1,
        p: 1,
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <ChallengeCard></ChallengeCard>
    </Box>
  );
};

export default Sidebar;
