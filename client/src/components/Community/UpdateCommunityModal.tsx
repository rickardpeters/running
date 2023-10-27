import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import {
  Community,
  showUpdateCommunityAtom,
  updateCommunityListAtom,
} from "../../recoil/atoms";
import axios from "axios";
import UpdateCommunityForm from "./UpdateCommunityForm";

interface UpdateCommuityModalProps {
  community: Community | null;
}

const DeleteCommunityModal: React.FC<UpdateCommuityModalProps> = ({
  community,
}) => {
  const [showUpdateCommunity, setShowUpdateCommunity] = useRecoilState(
    showUpdateCommunityAtom
  );
  const [updateCommunityList, setUpdateCommunityList] = useRecoilState(
    updateCommunityListAtom
  );
  const [showUpdateConfirmationCommunity, setShowUpdateConfirmationCommunity] =
    useRecoilState(showUpdateCommunityAtom);

  const handleUpdate = async () => {
    if (!community) return;

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/communities/${community.id}/`,
        {}
      );
      console.warn(res.data);
    } catch (error) {
      console.error("Could not update: ", error);
    }
    setShowUpdateCommunity(false);
    setUpdateCommunityList(!updateCommunityList);
    //setShowDeleteConfirmationCommunity(true);
  };

  return (
    <Dialog
      open={showUpdateCommunity}
      onClose={() => setShowUpdateCommunity(false)}
    >
      <DialogTitle>Create Community</DialogTitle>
      <form onSubmit={handleUpdate}>
        <DialogContent>
          <UpdateCommunityForm community={community}></UpdateCommunityForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdateCommunity(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Create Community
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeleteCommunityModal;
