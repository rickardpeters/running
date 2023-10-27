import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Community,
  showUpdateCommunityAtom,
  showUpdateConfirmationAtom,
  updateCommunityListAtom,
} from "../../recoil/atoms";
import axios from "axios";

interface UpdateCommuityModalProps {
  community: Community | null;
}

const UpdateCommunityModal: React.FC<UpdateCommuityModalProps> = ({
  community,
}) => {
  const [showUpdateCommunity, setShowUpdateCommunity] = useRecoilState(
    showUpdateCommunityAtom
  );
  const [updateCommunityList, setUpdateCommunityList] = useRecoilState(
    updateCommunityListAtom
  );
  const [showUpdateConfirmationCommunity, setShowUpdateConfirmationCommunity] =
    useRecoilState(showUpdateConfirmationAtom);

  const handleUpdate = async () => {
    if (!community) return;

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/communities/${community.id}/`,
        {}
      );
      console.warn(res.data);
    } catch (error) {
      console.error("Could not Update: ", error);
    }
    setShowUpdateCommunity(false);
    setUpdateCommunityList(!updateCommunityList);
    //setShowUpdateConfirmationCommunity(true);
  };

  return (
    <Dialog
      open={showUpdateCommunity}
      onClose={() => setShowUpdateCommunity(false)}
    >
      <DialogTitle>Edit {community && community.community_name}</DialogTitle>
      <DialogContent>
        <TextField label="Community Name" fullWidth margin="normal" />
        <TextField
          label="Description of Community"
          fullWidth
          margin="normal"
          multiline
          rows={2}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={() => setShowUpdateCommunity(false)}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdate()}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCommunityModal;
