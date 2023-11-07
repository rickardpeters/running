import React from "react";
import Tutorial from "../components/HomePage/Tutorial";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-5xl text-center font-bold m-5px">
        Welcome To RunNerds! &#x1F389;
      </p>
      <Tutorial />
    </div>
  );
};

export default HomePage;
