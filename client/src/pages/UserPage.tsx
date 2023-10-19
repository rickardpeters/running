import "../App.css";
import { useMediaQuery, Container } from "@mui/material";
import Sidebar from "../components/Sidebar";
import StravaCard from "../components/StravaCard";
import ChallengeList from "../components/Challenge/ChallengeList";
import { useRecoilState } from "recoil";
import { firebaseTokenAtom } from "../recoil/atoms";

const UserPage = () => {
  const isSmallScreen = useMediaQuery("(max-width: 850px)");
  const [token, setToken] = useRecoilState(firebaseTokenAtom);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "10px",
        justifyContent: "center",
      }}
    >
      {isSmallScreen ? null : <Sidebar></Sidebar>}
      <StravaCard />
      <ChallengeList />
    </Container>
  );
};

export default UserPage;
