import { Grid, Paper } from "@mui/material";
import React from "react";
import CommunityListDescription from "../components/CommunityListDescription";
import CommunityListComponent from "../components/CommunityListComponent";
import SearchCommunities from "../components/SearchCommunities";
import JoinedCommunitiesPaper from "../components/JoinedCommunitiesPaper";
import { showCreateCommunityAtom } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import CreateCommunityModal from "../components/CreateCommunityModal";

const CommunityList = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={2}
          style={{
            marginLeft: "17px",
            marginTop: "17px",
            paddingBottom: "15px",
          }}
        >
          <SearchCommunities></SearchCommunities>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <JoinedCommunitiesPaper></JoinedCommunitiesPaper>
      </Grid>
      
      <CreateCommunityModal/>
      
    </Grid>
  );
};

export default CommunityList;
