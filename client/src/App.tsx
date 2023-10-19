import React, { Suspense, useContext } from "react";
import AuthContext, { Context } from "./components/auth/AuthContextProvider";
import { RecoilRoot, useRecoilValue } from "recoil";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { userAtom } from "./recoil/atoms";
import AuthenticatedApp from "./authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app";

function App() {
  const user = useContext(Context);
  const user2 = useRecoilValue(userAtom);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>hello</div>}>
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
