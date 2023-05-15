import { useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";

import { RecoilRoot } from "recoil";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthContextProvider } from "./components/auth/AuthContextProvider";
import CommunityList from "./pages/CommunityList";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          
            <Routes>
              <Route path="/" element={<LandingPage></LandingPage>}></Route>
              <Route path="/userPage" element={<UserPage></UserPage>}></Route>
              <Route path="/homePage" element={<HomePage></HomePage>}></Route>
              <Route path="/communityList" element={<CommunityList></CommunityList>}></Route>
            </Routes>
          
        </Layout>
        </AuthContextProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
