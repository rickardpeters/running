import React, { Suspense, lazy, useContext } from "react";
import { Context } from "../components/auth/AuthContextProvider";
import { BrowserRouter } from "react-router-dom";
import OnScreenAlert from "../components/layout/OnScreenAlert";

function App() {
  const user = useContext(Context);

  const AuthenticatedApp = lazy(() => import("./authenticated-app"));
  const UnauthenticatedApp = lazy(() => import("./unauthenticated-app"));

  return (
    <BrowserRouter>
      <OnScreenAlert />
      <Suspense fallback={<div></div>}>
        {user.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
