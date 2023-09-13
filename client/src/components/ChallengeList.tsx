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
  CardActionArea,
  useMediaQuery,
  Grid,
  LinearProgress,
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

  const isSmallScreen = useMediaQuery("(max-width: 850px)");

  async function fetchChallenges() {
    try {
      const response = await axios.get("http://127.0.0.1:8500/challenges/", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
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
    sessionStorage.getItem("token")
      ? fetchChallenges()
      : console.log(
          "No token, cannot fetch challenges." + sessionStorage.getItem("token")
        );
  }, [updateChallengeList]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "500px",
          margin: "10px",
          justifyContent: "center",
          placeItems: "center",
        }}
      >
        <Grid>
          <CardContent
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Challenges</h2>
            <Typography>
              {challenges
                .slice()
                .sort((a, b) => {
                  const differenceA = a.goal - runTotals.distance / 1000;
                  const differenceB = b.goal - runTotals.distance / 1000;
                  return differenceB - differenceA;
                })
                .map((challenge) => (
                  <Card
                    sx={{
                      padding: "10px",
                      margin: "10px",
                      justifyContent: "center",
                      placeItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <CardActionArea sx={{}}>
                      <strong>{challenge.name}</strong>
                      <br />
                      <br />
                      {runTotals.distance / 1000 >= challenge.goal
                        ? "Challenge complete!"
                        : `${(runTotals.distance / 1000).toFixed(0)} of ${
                            challenge.goal
                          } km`}
                      <br />

                      <LinearProgress
                        variant="determinate"
                        color="success"
                        value={
                          (runTotals.distance / 1000 / challenge.goal) * 100
                        }
                      />
                    </CardActionArea>
                  </Card>
                ))}
            </Typography>
          </CardContent>
        </Grid>
        <CreateChallengeModal />
      </Card>
      <Button
        sx={{
          margin: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="contained"
        onClick={handleCreateChallenge}
      >
        Create challenge
      </Button>
    </Container>
  );
};

export default ChallengeList;
