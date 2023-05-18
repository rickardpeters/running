import { Box, Grid, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import CommunityListDescription from "./CommunityListDescription";
import CommunityListComponent from "./CommunityListComponent";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import { useRecoilState } from "recoil";
import { showCreateCommunityAtom } from '../recoil/atoms'

const JoinedCommunitiesPaper = () => {

  const [showCreateCommunity, setShowCreateCommunity] = useRecoilState(showCreateCommunityAtom)

  const exitCommunity = () => {
    console.log("exitCommunity");
  };

  const handleCreateCommunity = () => {
    setShowCreateCommunity(true);
    
  }
  return (
    <Box>
      <Paper
        elevation={2}
        style={{
          paddingBottom: "11px",
          marginRight: "17px",
          marginTop: "33px",
        }}
      >
        <Grid container spacing={2} justifyContent="center" style={{ width: "100%" }}>
          
          <Grid
            item
            xs={12}
            md={6}
            container
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              minWidth: "150px",
              flexDirection: { md: "column" },
              flexGrow: 1,
              flexBasis: 0,
              
            }}
          >
            <CommunityListDescription></CommunityListDescription>
          </Grid>
         
          <Grid
            item
            xs={12}
            md={6}
            container
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              minWidth: "150px",
              flexDirection: { md: "column" },
              flexGrow: 1,
              flexBasis: 0,
            }}
          >
            <IconButton onClick={handleCreateCommunity}>
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
