import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import AuthContext from "./components/auth/AuthContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <AuthContext>
        <App />
      </AuthContext>
    </RecoilRoot>
  </React.StrictMode>
);
