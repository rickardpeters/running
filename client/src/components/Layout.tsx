import React, { ReactNode } from 'react';
import Header from './Header';

// Interface for children bc TS
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;