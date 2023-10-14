import React, { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { showCreateCommunityAtom } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import CreateCommunityForm from "./CreateCommunityForm";
import { getUserToken } from "../utils";
import { auth } from "../firebase";
import axios from "axios";

const CreateCommunityModal = () => {
  const [showCreateCommunity, setShowCreateCommunity] = useRecoilState(
    showCreateCommunityAtom
  );
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");

  const handleCloseModal = () => {
    setShowCreateCommunity(false);
  };

  const handleSubmit = async () => {
    const token = await getUserToken(auth);

    console.log(description, communityName);
    const newCommunity = {
      community_name: communityName,
      description: description,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/communities/",
        newCommunity,
        config
      );
      console.log("community created:", response);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={showCreateCommunity} onClose={handleCloseModal}>
      <DialogTitle>Create Community</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <CreateCommunityForm
            name={communityName}
            description={description}
            setName={setCommunityName}
            setDescription={setDescription}
          ></CreateCommunityForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create Community
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCommunityModal;
