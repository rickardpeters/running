import React, { ReactNode } from "react";
import Header from "./Header";

// Interface for children bc TS
interface LayoutProps {
  children: ReactNode;
  auth: boolean;
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <Header auth={props.auth} />
      {props.children}
    </div>
  );
};

export default Layout;
