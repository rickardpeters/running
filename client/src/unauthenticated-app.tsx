import React, { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import NewLoginPage from "./pages/NewLoginPage";

function UnAuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/newLogin" element={<NewLoginPage />} />
      // handle non-existing routes
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default UnAuthenticatedApp;
