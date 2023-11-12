import React, { useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useRecoilState } from "recoil";
import CreateCommunityForm from "./CreateCommunityForm";
import axios from "axios";
import { Context } from "../auth/AuthContextProvider";
import { onScreenAlertAtom } from "../../recoil/atoms";
import { showCreateCommunityAtom, updateCommunityListAtom, createCommunityAtom } from "../../recoil/communityAtoms";

const CreateCommunityModal = () => {
  const user = useContext(Context);

  const token = user.user.accessToken;

  const [showCreateCommunity, setShowCreateCommunity] = useRecoilState(showCreateCommunityAtom);
  const [updateCommunityList, setUpdateCommunityList] = useRecoilState(updateCommunityListAtom);
  const [createCommunity, setCreateCommunity] = useRecoilState(createCommunityAtom);

  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

  const { community_name, description } = createCommunity;

  const handleCloseModal = () => {
    setShowCreateCommunity(false);
  };

  async function handleSubmit() {
    const newCommunity = {
      community_name: community_name,
      description: description,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("http://127.0.0.1:8000/communities/", newCommunity, config)
      .then(() => {
        setShowCreateCommunity(false);
        setUpdateCommunityList(!updateCommunityList);
        setAlert({
          showSnack: true,
          snackColor: "success",
          snackMessage: "Community Created",
        });
        setCreateCommunity({
          ...createCommunity,
          community_name: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error(error);
        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: "There was an error creating the community, please try again!",
        });
      });
  }

  return (
    <Dialog open={showCreateCommunity} onClose={handleCloseModal}>
      <DialogTitle>Create Community</DialogTitle>

      <DialogContent>
        <CreateCommunityForm />
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
