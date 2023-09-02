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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
    localStorage.getItem("token")
      ? fetchChallenges()
      : console.log(
          "No token, cannot fetch challenges." + localStorage.getItem("token")
        );
  }, [updateChallengeList]);

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
            {challenges
              .slice()
              .sort((a, b) => {
                const differenceA = a.goal - runTotals.distance / 1000;
                const differenceB = b.goal - runTotals.distance / 1000;
                return differenceB - differenceA;
              })
              .map((challenge) => (
                <li>
                  <strong>{challenge.name}</strong>
                  <br />
                  {runTotals.distance / 1000 >= challenge.goal
                    ? "Challenge complete!"
                    : `${runTotals.distance / 1000} of ${challenge.goal} km`}
                  <hr />
                </li>
              ))}
          </Typography>
        </CardContent>
        <Button
          sx={{
            display: "flex",
            flexDirection: "row",
            margin: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="outlined"
          onClick={handleCreateChallenge}
        >
          Create challenge
        </Button>
        <CreateChallengeModal />
      </Card>
    </Container>
  );
};

export default ChallengeList;
