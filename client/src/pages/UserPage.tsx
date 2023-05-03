import { useState } from 'react';
import '../App.css';
import axios from "axios";
import { Button, ButtonGroup, Card } from '@mui/material';

const UserPage = () => {

  const [loggedInState, setLoggedInState] = useState(false);
  const [athlete, setAthlete] = useState({ firstname: '', lastname: '', id: '' });
  const [runTotals, setRunTotals] = useState<{}>({})

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop:string) => searchParams.get(prop),
  });

  const signIn = async () => {
    window.location.href='https://www.strava.com/oauth/authorize?client_id=105576&redirect_uri=http://localhost:3000/UserPage&response_type=code&scope=read';
    setLoggedInState(!loggedInState);
    console.log(loggedInState);
  };

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    console.log(await getAccessToken(code));
  };

  async function getAccessToken(code: any): Promise<string> {
    try {
      const response = await axios.post("https://www.strava.com/oauth/token?", null, {
        params: {
          client_id: "105576",
          client_secret: "d91be7e7d6dc2775e6ee24f494d7079c172e2c8f",
          code: code,
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:3000/UserPage"
        }
      });

      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      console.log("accessToken: " + accessToken);
      console.log("refreshToken: " + refreshToken);
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
      const response = await axios.get('https://www.strava.com/api/v3/athlete', {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token")
        }
      });
      console.log(response.data);
      console.log(typeof response.data);
      setAthlete(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAthleteStats = async () => {
    try {
      const response = await axios.get('https://www.strava.com/api/v3/athletes/' + athlete.id + '/stats', {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token")
        }
      });
      console.log(response.data)
      setRunTotals(response.data.all_run_totals)
      console.log(runTotals)
      return response.data
    } catch (error) {
      console.error(error)
    }
    
  }

  function capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  return (
    <>
      <h1>
        Hello,
      </h1>
      <ButtonGroup variant="contained">
        <Button type='submit' onClick={signIn}>{loggedInState === false ? "Sign in": "Sign out"}</Button>
        <Button type='submit' onClick={fetchData}>Load data</Button>
        <Button type='submit' onClick={getAthleteInfo}>Fetch athlete info</Button>
      </ButtonGroup>
      <>
          <h2>Connecting account to {athlete.firstname !== ''  ? " " + athlete.firstname + " " + athlete.lastname + "!": "..."} </h2>
      </>
      <>
        <Button variant="contained" type='submit' onClick={getAthleteStats}>Load stats</Button>
      </>
        <>
        <h3>Running totals:</h3>
        <ul>
          {Object.entries(runTotals).map(([key, value]) => (
            <Card variant="outlined" key={key}>{capitalizeFirstLetter(key)}: {String(value)}</Card>
            ))}
        </ul>
        </>
    </>
  );
};

export default UserPage;
