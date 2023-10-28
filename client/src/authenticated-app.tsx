import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CommunityList from "./pages/CommunityList";
import UserPage from "./pages/UserPage";
import Layout from "./components/layout/Layout";

function AuthenticatedApp() {
  console.log("aut app");
  return (
    <Layout auth={true}>
      <Routes>
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/communityList" element={<CommunityList />} />
        //Handle non-existing routes
        <Route path="*" element={<Navigate to="/hej" replace />} />
      </Routes>
    </Layout>
  );
}

export default AuthenticatedApp;
