import { useRecoilState } from "recoil";
import {
  challengesAtom,
  firebaseTokenAtom,
  runTotalsAtom,
  showCreateChallengeAtom,
  updateChallengeListAtom,
} from "../recoil/atoms";
import axios from "axios";
import { useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import CreateChallengeModal from "./CreateChallengeModal";

const ChallengeList = () => {
  const [token, setToken] = useRecoilState(firebaseTokenAtom);
  const [challenges, setChallenges] = useRecoilState(challengesAtom);
  const [runTotals, setRunTotals] = useRecoilState(runTotalsAtom);
  const [showCreateChallenge, setShowCreateChallenge] = useRecoilState(
    showCreateChallengeAtom
  );
  const [updateChallengeList, setUpdateChallengeList] = useRecoilState(
    updateChallengeListAtom
  );

  async function fetchChallenges() {
    try {
      const response = await axios.get("http://127.0.0.1:8500/challenges/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setChallenges(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreateChallenge = () => {
    setShowCreateChallenge(true);
    console.log("create challenge");
    console.log(showCreateChallenge);
  };

  useEffect(() => {
    token || updateChallengeList
      ? fetchChallenges()
      : console.log("No token, cannot fetch challenges.");
  }, [token]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "20px",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: "250px", marginTop: "100px" }}>
        <CardContent>
          <h2>Challenges</h2>
          <Typography>
            {challenges.map((challenge) => (
              <li key={challenge.name}>
                {challenge.name}
                <br />
                {runTotals.distance / 1000 >= challenge.goal
                  ? "Challenge complete!"
                  : `Progress: ${runTotals.distance / 1000} of ${
                      challenge.goal
                    } km`}
              </li>
            ))}
          </Typography>
        </CardContent>
        <Button variant="outlined" onClick={handleCreateChallenge}>
          Create challenge
        </Button>
        <CreateChallengeModal />
      </Card>
    </Container>
  );
};

export default ChallengeList;
