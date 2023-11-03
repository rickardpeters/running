import { Button, ButtonGroup, Card, CardContent, Container, Typography } from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { stravaLoggedinAtom, athleteAtom, runTotalsAtom, onScreenAlertAtom } from "../recoil/atoms";
import { useEffect } from "react";

const StravaCard = () => {
  const [loggedInState, setLoggedInState] = useRecoilState(stravaLoggedinAtom);
  const [athlete, setAthlete] = useRecoilState(athleteAtom);
  const [runTotals, setRunTotals] = useRecoilState(runTotalsAtom);
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

  useEffect(() => {
    fetchData().catch((err) => console.error(err));
  }, [loggedInState]);

  useEffect(() => {
    if (athlete) {
      getAthleteStats(athlete).catch((err) => console.error(err));
    }
  }, [athlete]);

  const fetchData = async () => {
    const code = new URLSearchParams(window.location.search).get("code");
    const accessToken = await getAccessToken(code);
    if (accessToken) {
      await fetchAthleteInfo();
    }
  };

  const getAccessToken = async (code: any) => {
    try {
      const params = {
        client_id: "105576",
        client_secret: "d91be7e7d6dc2775e6ee24f494d7079c172e2c8f",
        code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/UserPage",
      };
      const { data } = await axios.post("https://www.strava.com/oauth/token?", null, { params });
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("refresh_token", data.refresh_token);
      return data.access_token;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting access token from Strava API");
    }
  };

  const fetchAthleteInfo = async () => {
    try {
      const { data } = await axios.get("https://www.strava.com/api/v3/athlete", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      setAthlete(data);
      await getAthleteStats(data);
      setAlert({
        showSnack: true,
        snackColor: "success",
        snackMessage: "Connected to Strava!",
      });
    } catch (error) {
      console.error(error);
      setAlert({
        showSnack: true,
        snackColor: "error",
        snackMessage: "Unable to connect to strava",
      });
    }
  };

  const getAthleteStats = async (athlete: any) => {
    try {
      const { data } = await axios.get(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      setRunTotals(data.all_run_totals);
      setAlert({
        showSnack: true,
        snackColor: "success",
        snackMessage: "Strava data succesfully fetched!",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = () => {
    const authUrl =
      "https://www.strava.com/oauth/authorize?client_id=" +
      `${105576}&redirect_uri=http://localhost:3000/UserPage&response_type=code&scope=read`;
    window.location.href = authUrl;
    setLoggedInState(!loggedInState);
  };

  return (
    <div className="relative grid place-items-center w-[100%] my-6">
      <div className="stat-value my-5">{athlete && athlete.firstname}</div>
      <div className="stats stats-vertical lg:stats-horizontal shadow w-auto rounded-sm bg-accent  ">
        <div className="stat">
          <div className="stat-title text-center">Number of runs</div>
          <div className="stat-value text-center">
            {runTotals.count.toLocaleString("en", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-center">Total Distance</div>
          <div className="stat-value text-center">
            {(runTotals.distance / 1000).toLocaleString("en", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }) + " km"}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-center">Moving time</div>
          <div className="stat-value text-center">
            {(runTotals.moving_time / 3600).toLocaleString("en", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }) + " h"}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-center">Elapsed time</div>
          <div className="stat-value text-center">
            {(runTotals.elapsed_time / 3600).toLocaleString("en", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }) + " h"}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-center">Elevation gain</div>
          <div className="stat-value text-center">
            {runTotals.elevation_gain.toLocaleString("en", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }) + " m"}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-16">
        <button className="btn btn-secondary  w-[100%] rounded-sm" onClick={signIn}>
          Log in to Strava
        </button>
      </div>
    </div>
  );
};

export default StravaCard;
