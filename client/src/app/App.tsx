import React, { Suspense, lazy, useContext } from "react";
import { Context } from "../components/auth/AuthContextProvider";
import { BrowserRouter } from "react-router-dom";
function App() {
  const user = useContext(Context);

  const AuthenticatedApp = lazy(() => import("./authenticated-app"));
  const UnauthenticatedApp = lazy(() => import("./unauthenticated-app"));

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
