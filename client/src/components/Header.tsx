import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HomeIcon from "@mui/icons-material/Home";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SignOutButton from "./SignOutButton";
import { UserContext } from "./auth/AuthContextProvider";
import { auth } from "../firebase";
import { useContext, useEffect, useState } from "react";

const Header = () => {
  const { user } = useContext(UserContext);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    setisLoggedIn(user);
  }, [user]);

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
        {user && <SignOutButton></SignOutButton>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
