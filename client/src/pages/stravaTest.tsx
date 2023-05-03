import { useState } from 'react';
import '../App.css';
import axios from "axios";

const StravaTest = () => {

  const [loggedInState, setLoggedInState] = useState(false);
  const [athlete, setAthlete] = useState({ firstname: '', lastname: '' });

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop:string) => searchParams.get(prop),
  });

  const handleClick = async () => {
    window.location.href='https://www.strava.com/oauth/authorize?client_id=105576&redirect_uri=http://localhost:3000/StravaTest&response_type=code&scope=read';
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
          redirect_uri: "http://localhost:3000/StravaTest"
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

  return (
    <>
      <h1>
        Springa på lite
      </h1>
      <button type='submit' onClick={handleClick}>{loggedInState === false ? "Sign in": "Sign out"}</button>
      <>
        <button type='submit' onClick={fetchData}>Load data</button>
        <button type='submit' onClick={getAthleteInfo}>Fetch athlete info</button>
      </>
      <>
          <h2>Welcome{athlete ? ", " + athlete.firstname + " " + athlete.lastname + "!": "!"} </h2>
      </>
    </>
  );
};

export default StravaTest;
