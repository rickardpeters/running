import React, { useState } from "react";
import { Button } from "@mui/material";
import WelcomeMessage from "../components/WelcomeMessage";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";


const LandingPage = () => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <WelcomeMessage></WelcomeMessage>
      <div style={{ display: "flex", gap: "16px" }}>
        <LoginModal ></LoginModal>
        <h2>OR</h2>
        <SignupModal></SignupModal>
        
      </div>
    </div>
  );
};

export default LandingPage;
function forceUpdate() {
  throw new Error("Function not implemented.");
}

