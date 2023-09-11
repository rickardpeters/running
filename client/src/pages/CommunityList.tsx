import { Grid, Paper } from "@mui/material";
import React from "react";
import Communities from "../components/Communities";

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
      <Communities />
    </Grid>
  );
};

export default CommunityList;
