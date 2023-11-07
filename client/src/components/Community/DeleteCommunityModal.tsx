import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import DeleteCommunityConfirmation from "./DeleteCommunityConfirmation";
import { Community } from "../../types/types";
import { onScreenAlertAtom } from "../../recoil/atoms";
import {
  showDeleteCommunityAtom,
  updateCommunityListAtom,
  showDeleteConfirmationAtom,
} from "../../recoil/communityAtoms";

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

  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

  const handleDelete = async () => {
    if (!community) return;

    await axios
      .delete(`http://127.0.0.1:8000/communities/${community.id}/`, {})
      .then(
        (response) =>
          setAlert({
            showSnack: true,
            snackColor: "info",
            snackMessage: "Community Deleted",
          }),
        (error) => {
          console.log(error);
          setAlert({
            showSnack: true,
            snackColor: "error",
            snackMessage: "Unable to delete community",
          });
        }
      );

    setShowDeleteCommunity(false);
    setUpdateCommunityList(!updateCommunityList);
  };

  return (
    <Dialog
      hideBackdrop
      open={showDeleteCommunity}
      onClose={() => setShowDeleteCommunity(false)}
    >
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete {community && community.community_name}?
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <button
          className="btn btn-inherit rounded-md"
          onClick={() => setShowDeleteCommunity(false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-error rounded-md"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCommunityModal;
