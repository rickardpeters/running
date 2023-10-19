import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../LogSign/SignOutButton";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const UnAuthHeader = () => {
  return (
    <AppBar sx={{ backgroundColor: "#fa6e43" }} position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Kubba på litt
        </Typography>

        <Button color="inherit" component={Link} to="/newLogin">
          Login
        </Button>

        <Button color="inherit" component={Link} to="/">
          <FlightLandIcon></FlightLandIcon>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UnAuthHeader;
