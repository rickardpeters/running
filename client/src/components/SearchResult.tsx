import { Box, Paper } from "@mui/material";
import React from "react";
import CommunityListComponent from "./CommunityListComponent";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const SearchResult = () => {
  const queryInput = () => {
    console.log("searching");
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
