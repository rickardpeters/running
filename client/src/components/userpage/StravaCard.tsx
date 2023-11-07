import axios from "axios";
import { useRecoilState } from "recoil";

import { useContext, useEffect } from "react";
import { Context } from "../auth/AuthContextProvider";
import { athleteAtom, onScreenAlertAtom, runTotalsAtom, stravaTokenAtom } from "../../recoil/atoms";

const StravaCard = () => {
  const [athlete, setAthlete] = useRecoilState(athleteAtom);
  const [runTotals, setRunTotals] = useRecoilState(runTotalsAtom);
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const [stravaToken, setStravaToken] = useRecoilState(stravaTokenAtom);

  const user = useContext(Context);
  const token = user.user.accessToken;

  useEffect(() => {
    const shouldFetch = Object.keys(runTotals).length === 0 || !runTotals.count;
    if (shouldFetch) {
      fetchData();
    }
  }, []);

  const signInToStrava = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get_strava_auth_url/");
      const authUrl = response.data.auth_url;
      console.log(authUrl);
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error fetching Strava auth URL", error);
    }
  };

  const fetchData = async () => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/strava_data/",
          { code },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setStravaToken(data.access_token);
        setAthlete(data.athlete_info);
        setRunTotals(data.stats.all_run_totals);

        setAlert({
          showSnack: true,
          snackColor: "success",
          snackMessage: "Strava data successfully fetched!",
        });
      } catch (error) {
        console.error("Error fetching Strava data from backend", error);
        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: "Failed to fetch Strava data",
        });
      }
    }
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
        <button className="btn btn-secondary  w-[100%] rounded-sm" onClick={signInToStrava}>
          Log in to Strava
        </button>
      </div>
    </div>
  );
};

export default StravaCard;
