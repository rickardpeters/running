import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Community } from "../../types/types";
import { onScreenAlertAtom } from "../../recoil/atoms";
import { showUpdateCommunityAtom, updateCommunityListAtom } from "../../recoil/communityAtoms";
import { Context } from "../auth/AuthContextProvider";

interface UpdateCommuityModalProps {
  community: Community | null;
}

const UpdateCommunityModal: React.FC<UpdateCommuityModalProps> = ({ community }) => {
  const user = useContext(Context);
  const uid = user.user.id;
  const token = user.user.accessToken;
  const [showUpdateCommunity, setShowUpdateCommunity] = useRecoilState(showUpdateCommunityAtom);
  const [updateCommunityList, setUpdateCommunityList] = useRecoilState(updateCommunityListAtom);

  const [updateName, setUpdateName] = useState(community?.community_name);
  const [updateDescription, setUpdateDescription] = useState(community?.description);

  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

  useEffect(() => {
    if (community) {
      setUpdateName(community.community_name);
      setUpdateDescription(community.description);
    }
  }, [community]);

  const handleUpdate = async () => {
    if (!community) return;

    await axios
      .put(
        `http://127.0.0.1:8000/communities/${community.id}/`,
        {
          community_name: updateName,
          description: updateDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) =>
          setAlert({
            showSnack: true,
            snackColor: "info",
            snackMessage: "Community Updated",
          }),
        (error) => {
          console.log(error);
          setAlert({
            showSnack: true,
            snackColor: "error",
            snackMessage: "Unable to update community",
          });
        }
      );

    setShowUpdateCommunity(false);
    setUpdateCommunityList(!updateCommunityList);
  };

  return (
    <Dialog open={showUpdateCommunity} onClose={() => setShowUpdateCommunity(false)}>
      <DialogTitle>Edit {community && community.community_name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Community Name"
          fullWidth
          margin="normal"
          value={updateName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateName(e.target.value)}
        />
        <TextField
          label="Description of Community"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          value={updateDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={() => setShowUpdateCommunity(false)}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={() => handleUpdate()}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCommunityModal;
