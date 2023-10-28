import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  showDeleteCommunityAtom,
  showDeleteConfirmationAtom,
  updateCommunityListAtom,
} from "../../recoil/atoms";
import axios from "axios";
import DeleteCommunityConfirmation from "./DeleteCommunityConfirmation";
import { Community } from "../../types/types";

interface DeleteCommunityModalProps {
  community: Community | null;
}

const DeleteCommunityModal: React.FC<DeleteCommunityModalProps> = ({
  community,
}) => {
  const [showDeleteCommunity, setShowDeleteCommunity] = useRecoilState(
    showDeleteCommunityAtom
  );
  const [updateCommunityList, setUpdateCommunityList] = useRecoilState(
    updateCommunityListAtom
  );
  const [showDeleteConfirmationCommunity, setShowDeleteConfirmationCommunity] =
    useRecoilState(showDeleteConfirmationAtom);

  const handleDelete = async () => {
    if (!community) return;

    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/communities/${community.id}/`,
        {}
      );
      console.warn(res.data);
    } catch (error) {
      console.error("Could not delete: ", error);
    }
    setShowDeleteCommunity(false);
    setUpdateCommunityList(!updateCommunityList);
    setShowDeleteConfirmationCommunity(true);
  };

  return (
    <Dialog
      open={showDeleteCommunity}
      onClose={() => setShowDeleteCommunity(false)}
    >
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete {community && community.community_name}?
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={() => setShowDeleteCommunity(false)}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      </DialogActions>
      <DeleteCommunityConfirmation />
    </Dialog>
  );
};

export default DeleteCommunityModal;
