import { useRecoilState } from "recoil";
import {
  challengesAtom,
  runTotalsAtom,
  showCreateChallengeAtom,
  updateChallengeListAtom,
} from "../../recoil/atoms";
import axios from "axios";
import { useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActionArea,
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

  async function fetchChallenges() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/challenges/", {});

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
    fetchChallenges();
  }, [updateChallengeList]);

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "4rem",
      }}
    >
      <Card
        sx={{
          width: "100%",
          marginTop: "0.5vw",
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
            <div className="stat-value text-2xl my-2 text-center text-accent-content">
              Challenges
            </div>
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
                    <CardActionArea>
                      <strong>{challenge.name}</strong>

                      <br />
                      {runTotals.distance / 1000 >= challenge.goal
                        ? "Challenge complete!"
                        : `${(runTotals.distance / 1000).toFixed(0)} of ${
                            challenge.goal
                          } km`}
                      <br />

                      <LinearProgress
                        variant="determinate"
                        color="primary"
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
      <button
        className="btn btn-primary rounded-sm m-[0.5vw]"
        onClick={() => handleCreateChallenge()}
      >
        Create challenge
      </button>
    </Container>
  );
};

export default ChallengeList;
