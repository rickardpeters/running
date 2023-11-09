import React from "react";
import Tutorial from "../components/HomePage/Tutorial";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center h-screen mt-16">
      <p className="text-5xl text-center font-bold ">Welcome To RunNerds! &#x1F389;</p>
      <Tutorial />
    </div>
  );
};

export default HomePage;
