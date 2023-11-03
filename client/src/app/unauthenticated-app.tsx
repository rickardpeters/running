import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import OnScreenAlert from "../components/layout/OnScreenAlert";

function UnAuthenticatedApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        // handle non-existing routes
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default UnAuthenticatedApp;
