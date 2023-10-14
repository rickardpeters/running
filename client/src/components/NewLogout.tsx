import axios from "axios";
import React, { useEffect } from "react";

const NewLogout = () => {
  const handleLogout = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/users/logout/", {});
    } catch (error) {
      console.error("Something wrong: ", error);
    }
    sessionStorage.clear();
    console.warn("You are now logged out.");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="grid place-items-center h-screen">
      <h1>Successfully logged out!</h1>
    </div>
  );
};

export default NewLogout;
