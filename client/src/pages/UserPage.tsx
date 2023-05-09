import { useState } from 'react';
import '../App.css';
import axios from "axios";
import { Button, ButtonGroup, Card, Paper, Container, Typography, CardContent } from '@mui/material';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { auth } from "../firebase"
import Sidebar from '../components/Sidebar';


const UserPage = () => {

  const [loggedInState, setLoggedInState] = useState(false);
  const [athlete, setAthlete] = useState({ firstname: '', lastname: '', id: '' });
  const [runTotals, setRunTotals] = useState<RunTotals>({count: 0, distance: 0, moving_time: 0, elapsed_time: 0, elevation_gain: 0});


  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop:string) => searchParams.get(prop),
  });

  const signIn = async () => {
    window.location.href='https://www.strava.com/oauth/authorize?client_id=105576&redirect_uri=http://localhost:3000/UserPage&response_type=code&scope=read';
    setLoggedInState(!loggedInState);
  };

  const fetchData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    getAccessToken(code)
    getAthleteInfo()
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
      setAthlete(response.data)
    } catch (error) {
      console.error(error);
    }
    getAthleteStats()
  };

  const getAthleteStats = async () => {
    try {
      const response = await axios.get('https://www.strava.com/api/v3/athletes/' + athlete.id + '/stats', {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token")
        }
      });
      setRunTotals(response.data.all_run_totals)
      console.log(response.data.all_run_totals)
      return response.data
    } catch (error) {
      console.error(error)
    }
    
  }

  function capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface RunTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

const barData = [
  { argument: 'Count', value: runTotals.count },
  { argument: 'Distance', value: runTotals.distance / 100 },
  { argument: 'Moving Time', value: runTotals.moving_time / 100 },
  { argument: 'Elapsed Time', value: runTotals.elapsed_time / 100 },
  { argument: 'Elevation Gain', value: runTotals.elevation_gain },
];

var user = auth.currentUser;

const useStyles = {
  button: {
    backgroundColor: '#2196f3',
    color: '#ffffff',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  },
};


  return (
    <Container 
    sx={{
      width: '300px',
      margin: '10px',
      padding: '10px',
      alignItems: 'center',
      flexDirection: 'row',
      display: 'flex',
    }}>
      <Sidebar></Sidebar>
      <Container
      sx={{
        width: '300px',
        margin: '10px',
        padding: '10px',
        
        flexDirection: 'column',
        display: 'flex',
      }}>
      <h1>
        Hello, {user?.email}
      </h1>
      <>
          {athlete.firstname !== ''? <h2>Account connected to {athlete?.firstname + " " + athlete?.lastname + "!"} </h2> : null}
      </>
        <>
        
            <Typography fontWeight={'bold'} sx={{ m: 1 }}>          
            <Card variant="outlined">
              <CardContent>
                <h3>Running Totals</h3>
                {Object.entries(runTotals).map(([key, value]) => {
                  const formattedValue =
                    key === 'count'
                    ? `${(Number(value)).toLocaleString('en', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })} runs`
                    : 
                    key === 'distance'
                      ? `${(Number(value) / 1000).toLocaleString('en', {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })} km`
                      : 
                      key === 'moving_time' || key === 'elapsed_time'
                      ? `${(Number(value) / 3600).toLocaleString('en', {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })} h`
                      :
                      key === 'distance'
                      ? `${(Number(value) / 1000).toLocaleString('en', {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })} km`
                      : 
                      key === 'elevation_gain'
                      ? `${(Number(value)).toLocaleString('en', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })} m`
                      : 
                      String(value);

                  return (
                    <Typography key={key} gutterBottom>
                      <b>{capitalizeFirstLetter(key)}</b>: {formattedValue}
                    </Typography>
                  );
                })}
              </CardContent>
            </Card>
            </Typography>
            <Button sx={useStyles} type='button' onClick={signIn}>Sign in to Strava account</Button>
            <ButtonGroup sx={useStyles}>
              <Button type='submit' onClick={fetchData}>Fetch Info</Button>
              <Button type='submit' onClick={getAthleteStats}>Load data</Button>
            </ButtonGroup>
            
        
        </>
        {/* <>
        <Paper>
        <Chart data = {barData}>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries valueField="value" argumentField="argument" />
        </Chart>
        </Paper>
        </> */}
    </Container>
    </Container>
      );
};

export default UserPage;
