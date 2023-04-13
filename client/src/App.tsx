import { useState } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [loggedInState, setLoggedInState] = useState(false)

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop:string) => searchParams.get(prop),
  });

  const handleClick = async () => {
    window.location.href='https://www.strava.com/oauth/authorize?client_id=105576&redirect_uri=http://127.0.0.1:5173&response_type=code&scope=read'
    setLoggedInState(!loggedInState)
    console.log(loggedInState)
  }

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    var code = ""
    code = urlParams.get('code');
    console.log(code)
    console.log(getAccessToken(code))

    const accessToken = await getAccessToken(code);
    const refreshToken = response.data.refresh_token;

  }


  async function getAccessToken(code: string): Promise<string> {
    try {
      const response = await axios.post("https://www.strava.com/oauth/token?client_id=105576&client_secret=d91be7e7d6dc2775e6ee24f494d7079c172e2c8f&code="+code+"&grant_type=authorization_code"
      );

      const accessToken = response.data.access_token
      return accessToken
    } catch (error) {
      console.error(error);
      throw new Error("Error getting access token from Strava API");
    }
  }



  return (
    <div>
      <h1>
        Springa på lite
      </h1>
      <button type='submit' onClick={handleClick}>{loggedInState === false ? "Sign in": "Sign out"}</button>
      <div>
        <button type='submit' onClick={fetchData}>Fetch</button>
      </div>
    </div>
  )
}

export default App
