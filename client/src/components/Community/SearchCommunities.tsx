import { Box, Typography } from "@mui/material";
import React from "react";
import SearchBar from "../SearchBar";
import SearchResult from "../SearchResult";

const SearchCommunities = () => {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h6">Search Communities</Typography>
      <SearchBar></SearchBar>
      <SearchResult></SearchResult>
    </Box>
  );
};

export default SearchCommunities;
