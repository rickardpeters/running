import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  stravaLoggedinAtom,
  athleteAtom,
  runTotalsAtom,
} from "../recoil/atoms";
import { useState } from "react";

const StravaCard = () => {
  const [loggedInState, setLoggedInState] = useRecoilState(stravaLoggedinAtom);
  const [athlete, setAthlete] = useRecoilState(athleteAtom);
  const [runTotals, setRunTotals] = useRecoilState(runTotalsAtom);
  const [openModal, setOpenModal] = useState<boolean>(false);

  function capitalizeAndRemoveUnderscore(string: string) {
    const stringWithoutUnderscore = string.replace(/_/g, " ");
    return (
      stringWithoutUnderscore.charAt(0).toUpperCase() +
      stringWithoutUnderscore.slice(1)
    );
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const signIn = async () => {
    window.location.href =
      "https://www.strava.com/oauth/authorize?client_id=105576&redirect_uri=http://localhost:3000/UserPage&response_type=code&scope=read";
    setLoggedInState(!loggedInState);
  };

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    getAccessToken(code);
    getAthleteInfo();
  };

  async function getAccessToken(code: any): Promise<string> {
    try {
      const response = await axios.post(
        "https://www.strava.com/oauth/token?",
        null,
        {
          params: {
            client_id: "105576",
            client_secret: "d91be7e7d6dc2775e6ee24f494d7079c172e2c8f",
            code: code,
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:3000/UserPage",
          },
        }
      );

      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("refresh_token", refreshToken);

      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting access token from Strava API");
    }
  }

  const getAthleteInfo = async () => {
    try {
      const response = await axios.get(
        "https://www.strava.com/api/v3/athlete",
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        }
      );
      setAthlete(response.data);
      var athlete = response.data;
    } catch (error) {
      console.error(error);
    }
    getAthleteStats(athlete);
    setOpenModal(true);
  };

  const getAthleteStats = async (athlete: any) => {
    try {
      const response = await axios.get(
        "https://www.strava.com/api/v3/athletes/" + athlete.id + "/stats",
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        }
      );
      setRunTotals(response.data.all_run_totals);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "10px",
        justifyContent: "center",
      }}
    >
      <>
        <Typography fontWeight={"bold"} sx={{ m: 1 }}>
          <Card sx={{ width: "250px", marginTop: "100px" }}>
            <CardContent>
              <h3>{athlete.firstname !== "" ? athlete.firstname : null}</h3>
              {Object.entries(runTotals).map(([key, value]) => {
                const formattedValue =
                  key === "count"
                    ? `${Number(value).toLocaleString("en", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })} runs`
                    : key === "distance"
                    ? `${(Number(value) / 1000).toLocaleString("en", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })} km`
                    : key === "moving_time" || key === "elapsed_time"
                    ? `${(Number(value) / 3600).toLocaleString("en", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })} h`
                    : key === "distance"
                    ? `${(Number(value) / 1000).toLocaleString("en", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })} km`
                    : key === "elevation_gain"
                    ? `${Number(value).toLocaleString("en", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })} m`
                    : String(value);

                return (
                  <Typography key={key} gutterBottom>
                    <b>{capitalizeAndRemoveUnderscore(key)}</b>:{" "}
                    {formattedValue}
                  </Typography>
                );
              })}
            </CardContent>
            <ButtonGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                margin: "20px",
                justifyContent: "center",
              }}
            >
              <Button variant="outlined" type="button" onClick={signIn}>
                Sign in to Strava account
              </Button>
              <Button variant="outlined" type="submit" onClick={fetchData}>
                Load data
              </Button>
            </ButtonGroup>
          </Card>
        </Typography>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Container sx={{ p: 2, width: 300, bgcolor: "background.paper" }}>
            <Typography variant="h5" gutterBottom>
              Sign In Successful!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Hello, {athlete.firstname}! Your account is now connected to your
              Strava account!
            </Typography>
            <Button variant="contained" onClick={handleCloseModal}>
              Close
            </Button>
          </Container>
        </Modal>
      </>
    </Container>
  );
};

export default StravaCard;