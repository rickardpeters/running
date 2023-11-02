import React, { ReactNode } from "react";
import Header from "./Header";
import OnScreenAlert from "./OnScreenAlert";

// Interface for children bc TS
interface LayoutProps {
  children: ReactNode;
  auth: boolean;
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <OnScreenAlert />
      <Header auth={props.auth} />
      {props.children}
    </div>
  );
};

export default Layout;
