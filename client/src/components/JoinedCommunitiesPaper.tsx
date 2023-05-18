import { Box, Grid, IconButton, Paper } from "@mui/material";
import React from "react";
import CommunityListDescription from "./CommunityListDescription";
import CommunityListComponent from "./CommunityListComponent";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

const JoinedCommunitiesPaper = () => {
  const exitCommunity = () => {
    console.log("exitCommunity");
  };
  return (
    <Box>
      <Paper
        elevation={2}
        style={{
          paddingBottom: "11px",
          marginRight: "17px",
          marginTop: "17px",
        }}
      >
        <Grid container>
          <Grid item xs={2} md={1} style={{margin:'50px'}}>
            <CommunityListDescription></CommunityListDescription>
          </Grid>
          <Grid item xs={2} md={1}>
            <IconButton>
              <CreateIcon></CreateIcon>
            </IconButton>
          </Grid>
        </Grid>

        <CommunityListComponent
          CommunityName={"Name of Comm"}
          ShortDescription={"This is a comm"}
          members={1337}
          ButtonFunc={exitCommunity}
          icon={<ClearIcon></ClearIcon>}
        ></CommunityListComponent>
      </Paper>
    </Box>
  );
};

export default JoinedCommunitiesPaper;
