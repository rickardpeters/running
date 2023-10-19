import { Button, TextField } from "@mui/material";
import React from "react";
import { emailAtom, passwordAtom } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import NewLogin from "../components/LogSign/NewLogin";

const NewLoginPage = () => {
  return (
    <>
      <NewLogin />
    </>
  );
};

export default NewLoginPage;
