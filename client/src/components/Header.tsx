import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HomeIcon from '@mui/icons-material/Home';
import FlightLandIcon from '@mui/icons-material/FlightLand';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Kubba på litt
        </Typography>
        <Button color="inherit" component={Link} to="/">
          <FlightLandIcon></FlightLandIcon>
        </Button>
        <Button color="inherit" component={Link} to="/UserPage">
        <DirectionsRunIcon></DirectionsRunIcon>
        </Button>
        <Button color="inherit" component={Link} to="/homePage">
        <HomeIcon></HomeIcon>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;