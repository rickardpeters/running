import { Grid } from "@mui/material";
import React from "react";
import Communities from "../components/Community/Communities";

const CommunityList = () => {
  return (
    <Grid container spacing={2}>
      <Communities />
    </Grid>
  );
};

export default CommunityList;
