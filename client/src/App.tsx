import React, { Suspense, useContext } from "react";
import { Context } from "./components/auth/AuthContextProvider";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedApp from "./authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app";

function App() {
  const user = useContext(Context);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        {user.user ? (
          <AuthenticatedApp></AuthenticatedApp>
        ) : (
          <UnauthenticatedApp></UnauthenticatedApp>
        )}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
