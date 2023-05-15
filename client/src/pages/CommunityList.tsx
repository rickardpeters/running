import { Grid, Paper } from "@mui/material";
import React from "react";
import CommunityListDescription from "../components/CommunityListDescription";
import CommunityListComponent from "../components/CommunityListComponent";
import SearchCommunities from "../components/SearchCommunities";

const CommunityList = () => {
  return (

    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={2}>
        <SearchCommunities></SearchCommunities>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Paper elevation={2}>
        <CommunityListDescription></CommunityListDescription>
        <CommunityListComponent></CommunityListComponent>
        <CommunityListComponent></CommunityListComponent>
        </Paper>
      </Grid>
    </Grid>
    
  );
};

export default CommunityList;
