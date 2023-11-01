import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CommunityList from "../pages/CommunityList";
import UserPage from "../pages/UserPage";
import Layout from "../components/layout/Layout";
import AboutPage from "../pages/AboutPage";

function AuthenticatedApp() {
  return (
    <Layout auth={true}>
      <Routes>
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/communityList" element={<CommunityList />} />
        <Route path="/about" element={<AboutPage />} />
        //Handle non-existing routes
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default AuthenticatedApp;
