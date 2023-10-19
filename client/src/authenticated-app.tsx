import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NewLogout from "./components/NewLogout";
import CommunityList from "./pages/CommunityList";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import Layout from "./components/layout/Layout";

function AuthenticatedApp() {
  console.log("aut app");
  return (
    <Layout auth={true}>
      <Routes>
        <Route path="/newLogout" element={<NewLogout />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/communityList" element={<CommunityList />} />
        //Handle non-existing routes
        <Route path="*" element={<Navigate to="/homePage" replace />} />
      </Routes>
    </Layout>
  );
}

export default AuthenticatedApp;
