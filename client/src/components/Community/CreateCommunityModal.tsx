import React, { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Collapse,
} from "@mui/material";
import {
  onScreenAlertAtom,
  showCreateCommunityAtom,
  updateCommunityListAtom,
} from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import CreateCommunityForm from "./CreateCommunityForm";
import { getUserToken } from "../../utils";
import { auth } from "../../firebase";
import axios from "axios";
import OnScreenAlert from "../layout/OnScreenAlert";

const CreateCommunityModal = () => {
  const [showCreateCommunity, setShowCreateCommunity] = useRecoilState(
    showCreateCommunityAtom
  );
  const [updateCommunityList, setUpdateCommunityList] = useRecoilState(
    updateCommunityListAtom
  );
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");

  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

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
        newCommunity
      );
      console.warn(response.data);
      setUpdateCommunityList(!updateCommunityList);
      setCommunityName("");
      setDescription("");

      setAlert({
        showSnack: true,
        snackColor: "success",
        snackMessage: "Community Created",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        showSnack: true,
        snackColor: "error",
        snackMessage:
          "There was an error creating the community, please try again!",
      });
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
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Create Community
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCommunityModal;
