import { Box, Paper } from "@mui/material";
import React from "react";
import CommunityListComponent from "./CommunityListComponent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

const SearchResult = () => {

    const API = 'http://127.0.0.1:8000'
  const queryInput = () => {

    
  };
  return (
    <Box style={{ margin: "10px" }}>
      <CommunityListComponent
        CommunityName={"SearchRes"}
        ShortDescription={"Rolfs rövar likga. Vi kubbar, vi bastar, och älskar."}
        members={69}
        ButtonFunc={queryInput}
        icon={<AddCircleIcon></AddCircleIcon>}
      ></CommunityListComponent>
    </Box>
  );
};

export default SearchResult;
