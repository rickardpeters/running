import React from "react";
import { Link } from "react-router-dom";
import TutorialCard from "./TutorialCard";
import { ContentCopy } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Tutorial = () => {
  const card1 = {
    title: "1. Connect to Strava",
    content:
      "From your profile page you can connect your RunNerds account to Strava. This will allow you to view your strava stats on RunNerds!",
    btnText: "To Profile",
    link: "/Userpage",
  };

  const card2 = {
    title: "2. Join Communities",
    content:
      "You can join any community that seem fun and interresting! You can also create your own Community where you and your friends can compete in challenges together.",
    btnText: "Checkout Communities",
    link: "/communityList",
  };

  const card3 = {
    title: "3. Create or Partake in Challenges",
    content:
      "You, and other members of the community, can now create and partake in challanges! The stats onm the challeneges are based on your strava account. From your profile page you can see your active challeneges and create new ones!",
    btnText: "To Profile",
    link: "/UserPage",
  };

  return (
    <div className="flex flex-wrap">
      <TutorialCard card={card1} />
      <TutorialCard card={card2} />
      <TutorialCard card={card3} />
    </div>
  );
};

export default Tutorial;
