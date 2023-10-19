import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOutButton";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HomeIcon from "@mui/icons-material/Home";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const AuthHeader = () => {
  return (
    <AppBar sx={{ backgroundColor: "#fa6e43" }} position="sticky">
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
        <Button color="inherit" component={Link} to="/communityList">
          communityList
        </Button>
        <SignOutButton></SignOutButton>
      </Toolbar>
    </AppBar>
  );
};

export default AuthHeader;
