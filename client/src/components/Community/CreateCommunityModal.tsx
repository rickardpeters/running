import React, { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { onScreenAlertAtom, showCreateCommunityAtom, updateCommunityListAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import CreateCommunityForm from "./CreateCommunityForm";

import axios from "axios";

import { Context } from "../auth/AuthContextProvider";

const CreateCommunityModal = () => {
  const user = useContext(Context);

  const token = user.user.token;

  const [showCreateCommunity, setShowCreateCommunity] = useRecoilState(showCreateCommunityAtom);
  const [updateCommunityList, setUpdateCommunityList] = useRecoilState(updateCommunityListAtom);
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");

  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

  const handleCloseModal = () => {
    setShowCreateCommunity(false);
  };

  async function handleSubmit() {
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
      const response = await axios.post("http://127.0.0.1:8000/communities/", newCommunity, config);
      console.warn(response.data);
      setShowCreateCommunity(false);
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
        snackMessage: "There was an error creating the community, please try again!",
      });
    }
  }

  return (
    <Dialog open={showCreateCommunity} onClose={handleCloseModal}>
      <DialogTitle>Create Community</DialogTitle>

      <DialogContent>
        <CreateCommunityForm
          name={communityName}
          description={description}
          setName={setCommunityName}
          setDescription={setDescription}></CreateCommunityForm>
      </DialogContent>
      <DialogActions>
        <button className="btn rounded-md" onClick={handleCloseModal}>
          Cancel
        </button>
        <button className="btn btn-info rounded-md" onClick={handleSubmit} type="submit">
          Create Community
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCommunityModal;
